'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Info, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
// import { useResendResetPasswordOtp } from '@/hooks/auth/useResendResetPasswordOtp';
// import { useVerifyResetPasswordOtp } from '@/hooks/auth/useVerifyResetPasswordOtp';

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});
interface VerifyForgetPasswordOTPFormProps {
  email: string | null;
  counter: string;
}

export function VerifyForgetPasswordOTPForm({
  email,
  counter,
}: VerifyForgetPasswordOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  // const { resendForgetPasswordOtpFn, isLoading: isResending } =
  //   useResendResetPasswordOtp();

  // const { verifyOtpFn, isLoading } = useVerifyResetPasswordOtp();
  const [isLoading] = useState(false);
  const [isResending] = useState(false);

  const handleResendOtP = async () => {
    if (!email) return;
    const payload = {
      email: email,
    };
    // await resendForgetPasswordOtpFn(payload);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      email: email!,
      otp: data.otp,
    };
    // await verifyOtpFn(payload);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-sm items-center justify-center space-y-4 p-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className="w-ull mx-auto space-x-4">
                    <InputOTPSlot
                      index={0}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={1}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={2}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={3}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={4}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={5}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isResending}
        >
          {isLoading ? 'Verifying' : 'Verify OTP'}
        </Button>

        <div className="my-4  justify-center flex flex-col text-center rounded-md  px-4 py-2 space-y-3">
          <span className="text-black text-center">Didn’t get the code?</span>

          {counter === '00:00' ? (
            <Button
              variant={'outline'}
              onClick={handleResendOtP}
              disabled={isResending}
              className="flex gap-2"
            >
              <RefreshCcw />
              <span>Resend OTP </span>
            </Button>
          ) : (
            <span>Resend ({counter})</span>
          )}
        </div>
      </form>
    </Form>
  );
}
