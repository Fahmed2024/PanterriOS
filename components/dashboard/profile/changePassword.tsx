'use client';
import { Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import PasswordStrength from '../shared/password-strength';

const resetPasswordSchema = z
  .object({
    currentNewPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password too long'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password too long'),
    confirmNewPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password too long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export function ChangePassword() {
  //   const { resetPasswordFn, isLoading } = useResetPassword();
  const [isLoading] = useState(false);
  const validPasswordOption = [
    '• Minimum 8 characters long',
    '• At least one uppercase letter',
    '• At least one lowercase letter',
    '• At least one number',
    '• At least one special character (!@#$%^&*)',
  ];
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
      currentNewPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    const payload = {
      ...data,
    };
    // await resetPasswordFn(payload);
    console.log(payload);
  };

  return (
    <div className="p-4 lg:p-6 rounded-xl shadow space-y-4 ">
      <div className=" flex gap-2">
        <Shield className=" text-blue-500 w-6 h-6" />
        <span className="text-2xl"> Security Settings</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    password
                    placeholder="Enter new password"
                    disabled={isLoading}
                    {...field}
                    className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    password
                    placeholder="Enter new password"
                    disabled={isLoading}
                    {...field}
                    className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    password
                    placeholder="Confirm password"
                    disabled={isLoading}
                    {...field}
                    className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="bg-blue-50 p-2">
            <div className="text-lg">Password Requirements:</div>
            <ul className="space-y-1 text-sm">
              {validPasswordOption.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </div>
          <div className=" flex justify-end">
            <Button type="submit" className="  " size="lg" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
