import React, { useCallback, useState } from 'react';
import Link from 'next/link';
// Components
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
// Lib
import { cn } from '@/lib/utils';
// icons
import { Check, Eye, EyeOff, Search, X } from 'lucide-react';
// Hooks
import useCountryFlag from '@/hooks/useCountryFlag';
import { useTranslations } from 'next-intl';

interface InputProps extends React.ComponentProps<'input'> {
  inputType?: 'input' | 'search' | 'textarea' | 'userInput';
  control: any;
  name: string;
  label?: string;
  query?: string;
  forgotPassword?: boolean;
  onClearQuery?: () => void;
}

export default function RoodxInput({ className, inputType = 'input', control, name, placeholder, label, type, query, onClearQuery, forgotPassword }: InputProps) {
  const t = useTranslations('Error');

  const { countryCode, showFlag, showError, handleInputShowFlag } = useCountryFlag();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleInputChange = useCallback(
    (value: string) => {
      if (inputType === 'userInput') {
        handleInputShowFlag(value);
      }
    },
    [inputType, handleInputShowFlag]
  );

  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            {label && !forgotPassword && <FormLabel>{label}</FormLabel>}
            {label && forgotPassword && name.includes('password') && (
              <div className="flex items-center">
                {label && <FormLabel>{label}</FormLabel>}
                <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline text-end text-roodx-primary">
                  Forgot your password?
                </Link>
              </div>
            )}
            <FormControl>
              <div className="relative">
                {inputType === 'textarea' ? (
                  <Textarea placeholder={placeholder} aria-invalid={!!fieldState.error} {...field} />
                ) : (
                  <Input
                    dir="ltr"
                    type={(name.includes('password') || name.includes('confirmPassword')) && isPasswordVisible ? 'text' : type}
                    className={cn(inputType === 'search' || (showFlag && 'pl-10'))}
                    placeholder={placeholder}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e.target.value); // استخدام onChange من react-hook-form
                      handleInputChange(e.target.value); // التعامل مع المدخلات الخاصة بك
                    }}
                    aria-invalid={!!fieldState.error}
                  />
                )}

                {/* Country flag for phone input */}
                {inputType === 'userInput' && showFlag && (
                  <img src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} className="absolute left-3 top-1/2 -translate-y-1/2" alt="flag" width="24px" />
                )}

                {/* Validation check icon */}
                {inputType === 'userInput' &&
                  showFlag &&
                  (showError ? (
                    <X size={20} className="absolute right-3 top-1/2 -translate-y-1/2 color-roodx-danger" />
                  ) : (
                    <Check size={20} className="absolute right-3 top-1/2 -translate-y-1/2 color-roodx-success" />
                  ))}

                {/* Search icon (left side) */}
                {inputType === 'search' && <Search name="search" width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-roodx-subtitleText" />}

                {/* Clear button for search input (right side) */}
                {inputType === 'search' && query && (
                  <button type="button" onClick={onClearQuery} className="absolute right-3 top-1/2 -translate-y-1/2 text-roodx-subtitleText">
                    <X size={20} />
                  </button>
                )}

                {/* Password visibility toggle (right side) */}
                {(name.includes('password') || name.includes('confirmPassword')) && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-roodx-subtitleText"
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  >
                    {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
