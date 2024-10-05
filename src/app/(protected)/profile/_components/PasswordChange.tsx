"use client"
import React, { useTransition } from 'react'
import { UserDataProps } from './Profile'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserPassword } from '@/actions/profileHandler'
import { passwordChangeSchema } from '@/lib/schema/profileType'
import { toast } from 'sonner'
import { z } from 'zod'

const PasswordChange = ({ userData }: { userData: UserDataProps }) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirm: '',
    }
  })

  const onSubmit = (values: z.infer<typeof passwordChangeSchema>) => {
    startTransition(() => {
      updateUserPassword(values).then((response) => {
        if (response.status === 400) {
          toast.error(response.message)
        }

        if (response.status === 'success') {
          toast.success("User password update Successfull")
        }
      }).catch(error => {
        console.log(error);
      })
    })
  }

  return (
    <div className='p-4'>
      <span className="text-center font-bold">
        Update User Password
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name='old_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='********' disabled={isPending} enablePasswordToggle />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='new_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='********' disabled={isPending} enablePasswordToggle />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='new_password_confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password Confirm</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='********' disabled={isPending} enablePasswordToggle />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' isLoading={isPending} className='w-full'>
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PasswordChange