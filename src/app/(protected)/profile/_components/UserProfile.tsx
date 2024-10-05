"use client";
import React, { useTransition } from 'react'
import { UserDataProps } from './Profile'
import { useForm } from 'react-hook-form'
import { nameUpdateSchema } from '@/lib/schema/profileType'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { updateUserName } from '@/actions/profileHandler';
import { toast } from 'sonner';


const UserProfile = ({ userData }: { userData: UserDataProps }) => {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof nameUpdateSchema>>({
        resolver: zodResolver(nameUpdateSchema),
        defaultValues: {
            name: userData.name,
            email: userData.email,
        }
    })

    const onSubmit = (values: z.infer<typeof nameUpdateSchema>) => {
        startTransition(() => {
            updateUserName({ name: values.name }).then((response) => {
                if (response.status === 400) {
                    toast.error(response.message)
                }

                if (response.status === 'success') {
                    toast.success("User profile update Successfull")
                }
            }).catch(error => {
                console.log(error);
            })
        })
    }

    return (
        <div className='p-4'>
            <span className="text-center font-bold">
                Update User Name
            </span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='johndoe@gmail.com' disabled={isPending} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='John Doe' disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' isLoading={isPending} className='w-full'>
                            Update User Name
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UserProfile