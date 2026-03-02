'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendResetPasswordOtp } from '@/hook/auth/useSendResetPasswordOtp';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';
import { BellRing } from 'lucide-react';

const createPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;

export default function ForgetPasswordForm() {
  const { sendResetPasswordOtpFn, isLoading } = useSendResetPasswordOtp();
  const form = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: CreatePasswordSchema) => {
    await sendResetPasswordOtpFn({ email: data.email.toLowerCase() });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  email
                  disabled={isLoading}
                  {...field}
                  className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                />
              </FormControl>
              <p className="text-sm">
                We&apos;ll send a 6-digit verification code to this email
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center">
              <span> Sending...</span> <Spinner />
            </div>
          ) : (
            <span>Send Verification Code</span>
          )}
        </Button>
      </form>

      <div className="p-4 flex items-start gap-2 text-blue-500 bg-blue-100 border border-blue-500 mt-4">
        <div className="w-10">
          <BellRing />
        </div>
        <div className="w-full ">
          <h2 className="font-semibold">NOTE</h2>
          <p className="lg:text-sm text-xs">
            If you don&apos;t receive the email within 5 minutes, check your spam
            folder or contact support.
          </p>
        </div>
      </div>
    </Form>
  );
}
