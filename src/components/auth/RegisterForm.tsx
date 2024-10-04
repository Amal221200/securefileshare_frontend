"use client"
import { useTransition } from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { registerSchema } from '@/lib/schema/authType';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RegisterApi } from '@/actions/authHandler';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        startTransition(() => {
            RegisterApi(values).then((response) => {
                if (response?.status === 400) {
                    toast.error(response.message)
                }
                if (response?.status === "success") {
                    toast.success(`${response.message}, Redirecting to login...`);
                    form.reset();
                    router.push("/login");
                }
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    return (
        <AuthCard headerLabel="Create an Account" backButtonHref="/login" backButtonLabel="Already have an account" className="w-[600px]">
            <Form {...form}>
                <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-row flex-wrap gap-4">
                        <div className='flex-1'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='John Doe'
                                                type='text' {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='johndoe@gmail.com'
                                                type='email' {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                    <div className='flex flex-row flex-wrap gap-4'>
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder='********' enablePasswordToggle type='password' {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name='passwordConfirm'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder='********' enablePasswordToggle type='password' {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" isLoading={isPending} className='w-full'>
                        Create an Account
                    </Button>
                </form>
            </Form>
        </AuthCard>
    )
}

export default RegisterForm