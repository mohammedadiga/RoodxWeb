import React from 'react';
import { cn } from '@/lib/utils';
// Components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

interface InputProps extends React.ComponentProps<'input'> {
  inputType?: 'input' | 'search' | 'userInput';
  control: any;
  name: string;
  label?: string;
  query?: string;
  onClearQuery?: () => void;
}

export default function RoodxCodeInput({ className, control, name, label }: InputProps) {
  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputOTP type="tel" inputMode="numeric" pattern="\d*" maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} autoFocus />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
