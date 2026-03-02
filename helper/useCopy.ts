'use client';
import { toast } from 'sonner';
export function useCopy() {
  const copyValue = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${message} copied`);
    } catch {
      toast.error(`Unable to copy ${message}`);
    }
  };
  return { copyValue };
}
