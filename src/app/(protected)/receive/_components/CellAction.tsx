"use client";
import { useSession } from "next-auth/react";
import { ReceiveColumnsType } from "./columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const passwordSchema = z.object({
    password: z
        .string()
        .min(6, { message: "Password should be atleast 6 characters long" }),
})


const CellAction = ({ data }: { data: ReceiveColumnsType }) => {
    const session = useSession()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: ""
        }
    })


    const handleToggle = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    const handleRetreiveFile = useCallback(async (password: string) => {
        try {
            const response = await fetch('http://localhost:8000/api/file/retrieve', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.data?.user?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shared_id: data.file_id, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to retrieve file');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.file_name); // You can set a specific filename here
            document.body.appendChild(link);
            link.click();
            link.remove();
            form.reset();
            handleToggle();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
            toast.error(errorMessage);
        }
    }, [session.data?.user.accessToken, form, handleToggle, data.file_id, data.file_name])



    const onSubmit = (values: z.infer<typeof passwordSchema>) => {
        startTransition(() => {
            handleRetreiveFile(values.password)
        })
    }
    return (
        <div className="flex items-center justify-center">
            <Button variant="outline" size="icon" onClick={handleToggle}>
                <DownloadIcon className="h-4 w-4" />
            </Button>
            <Dialog open={open} onOpenChange={handleToggle}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            File Password
                        </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                enablePasswordToggle
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button isLoading={isPending} type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CellAction