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
import { ActivationCodeSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// i18n
import { useTranslations } from 'next-intl';
// Icon
import { ArrowLeft } from 'lucide-react';

type FormValues = z.infer<typeof ActivationCodeSchema>;

interface Props extends React.ComponentProps<'form'> {
  onNext: () => void;
  onBack: () => void;
}

export function ForgotCodeForm({ onNext, onBack, className, ...props }: Props) {
  const t = useTranslations('Auth');

  let descriptionText = t('verificationEmailDescription');

  // let descriptionText = '';
  // if (emailRegex.test(emailOrPhone)) {
  //   descriptionText = `${t('auth.verificationPassword.EmailDescription')}`;
  // } else {
  //   descriptionText = `${t('auth.verificationPassword.PhoneDescription')}`;
  // }

  const form = useForm<z.infer<typeof ActivationCodeSchema>>({
    resolver: zodResolver(ActivationCodeSchema),
    defaultValues: {
      activationCode: '',
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
          <div className="flex justify-center">
            <RoodxCodeInput control={form.control} inputType="userInput" name="activationCode" label={t('input.userInfoAndUsername')} type="text" placeholder={t('input.placeholder.userInfo')} />
          </div>
          <Button type="submit" className="w-full">
            {t('next')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
