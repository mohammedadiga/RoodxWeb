'use client';
//
import { cn } from '@/lib/utils';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RoodxInput from '@/components/roodx_ui/roodx-input';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// Redux context
// import { useLoginMutation } from "@/context/features/auth/authApi";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormValues = z.infer<typeof SignUpSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('Auth');

  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      userInfo: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Rudex
  // const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FormValues) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('signup')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('signupDescription')}</p>
        </div>
        <div className="grid gap-6">
          <RoodxInput control={form.control} inputType="userInput" name="userInfo" label={t('input.userInfo')} type="text" placeholder={t('input.placeholder.userInfo')} />
          <RoodxInput control={form.control} name="password" label={t('input.password')} type="password" placeholder={t('input.placeholder.password')} />
          <RoodxInput control={form.control} name="confirmPassword" label={t('input.confirmPassword')} type="password" placeholder={t('input.placeholder.password')} />

          <Button type="submit" className="w-full">
            {t('signup')}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
          {/* Githup Button */}
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/login" className="text-sm underline-offset-4 hover:underline text-end text-roodx-primary">
            {t('login')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
