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
import { ForgotPasswordSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// i18n
import { useTranslations } from 'next-intl';
// Icon
import { ArrowLeft } from 'lucide-react';

type FormValues = z.infer<typeof ForgotPasswordSchema>;

interface Props extends React.ComponentProps<'form'> {
  onNext: () => void;
}

export function ForgotEmailForm({ onNext, className, ...props }: Props) {
  const t = useTranslations('Auth');

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      userInfo: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    onNext();
  };

  return (
    <Form {...form}>
      <Link href="/login">
        <Button variant="outline" size="icon" className="flex items-center justify-center">
          <ArrowLeft width={20} height={20} className="text-roodx-subtitleText" />
        </Button>
      </Link>

      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('recoveryPassword')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('forgotPasswordDescription')}</p>
        </div>
        <div className="grid gap-6">
          <RoodxInput control={form.control} label={t('input.userInfoAndUsername')} inputType="userInput" name="userInfo" type="text" placeholder={t('input.placeholder.userInfo')} />

          <Button type="submit" className="w-full">
            {t('next')}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t('didntHaveAccount')}{' '}
          <Link href="/signup" className="text-sm underline-offset-4 hover:underline text-end text-roodx-primary">
            {t('signup')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
