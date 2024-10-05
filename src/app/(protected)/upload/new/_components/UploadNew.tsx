"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useCallback, } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailFormSchema = z.object({
    recipient_email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, { message: "Password should be atleast 6 characters long" }),
    expiration_date: z.date().refine(
        (val) => val >= new Date(),
        "Expiration date should be in the future"
    ),
    fileUpload: z.instanceof(File, { message: "Please upload a file" })
        .refine(file => file && file.size < 4 * 1024 * 1024, {
            message: "File size should be less than 4MB",
        }),
})

const UploadNew = () => {
    const session = useSession();


    const tomorrowDate = useCallback(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow
    }, []);

    const form = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            recipient_email: "",
            password: "",
            expiration_date: tomorrowDate(),
        }
    })

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0]
        if (file) {
            form.setValue("fileUpload", file);
        }
    }

    const onSubmit = (value: z.infer<typeof emailFormSchema>) => {
        console.log(value);
    }

    return (
        <Card>
            <CardHeader>
                Upload new file
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="recipient_email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} placeholder="johndoe@gmail.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="*******" enablePasswordToggle />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="fileUpload"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Upload</FormLabel>
                                    <FormControl>
                                        <Input type="file" onChange={handleFileInput} accept=".jpg,.jpeg,.png,.pdf" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="expiration_date"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiration Date</FormLabel>
                                    <FormControl>
                                        <div>
                                            <DatePicker date={field.value} onChange={(date) => {
                                                field.onChange(date)
                                            }} disable={date => date <= new Date()} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Upload File
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UploadNew