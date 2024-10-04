"use client"

import React, { useTransition } from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { loginSchema } from '@/lib/schema/authType';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoginApi } from '@/actions/authHandler';
import { toast } from 'sonner';

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        startTransition(() => {
            LoginApi(values).then((response) => {
                if (response?.error) {
                    toast.error(response.error)
                }
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    return (
        <AuthCard headerLabel="Welcome Back" backButtonHref="/register" backButtonLabel="Don't have an account">
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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

                    <Button type="submit" isLoading={isPending} className='w-full'>
                        Login
                    </Button>
                </form>
            </Form>
        </AuthCard>
    )
}

export default LoginForm