'use client';
import React from 'react';
import Link from 'next/link';
// lib
import { cn } from '@/lib/utils';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxInput from '@/components/roodx_ui/roodx-input';
import RoodxCodeInput from '@/components/roodx_ui/roodx-code-input';
// hook form
import { useForm } from 'react-hook-form';
// Validator
import { ResetPasswordSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// i18n
import { useTranslations } from 'next-intl';
// Icon
import { ArrowLeft } from 'lucide-react';

type FormValues = z.infer<typeof ResetPasswordSchema>;

interface Props extends React.ComponentProps<'form'> {
  onNext: () => void;
  onBack: () => void;
}

export function ForgotResetForm({ onNext, onBack, className, ...props }: Props) {
  const t = useTranslations('Auth');

  let descriptionText = t('verificationEmailDescription');

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    onNext();
  };

  return (
    <Form {...form}>
      <Button variant="outline" size="icon" className="flex items-center justify-center" onClick={() => onBack()}>
        <ArrowLeft width={20} height={20} className="text-roodx-subtitleText" />
      </Button>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('verificationCode')}</h1>
          <p className="text-muted-foreground w-full text-sm">{descriptionText}</p>
        </div>
        <div className="grid gap-6 ">
          <RoodxInput control={form.control} label={t('input.password')} name="password" type="password" placeholder={t('input.placeholder.password')} />
          <RoodxInput control={form.control} label={t('input.confirmPassword')} name="confirmPassword" type="password" placeholder={t('input.placeholder.password')} />
          <Button type="submit" className="w-full">
            {t('login')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
