import { z } from 'zod';
// Validators
import { activationCodeSchema, companyNameSchema, dateSchema, emailSchema, firstnameSchema, lastnameSchema, passwordSchema, phoneSchema, userNameSchema } from '@/validators/validator';

// Async schema for userInfo to handle email, username, or phone validation
export const LoginSchema = z.object({
  userInfo: z.string().refine(
    async (value) => {
      // Email validation
      const isEmailValid = await emailSchema.safeParseAsync(value).then((res) => res.success);
      // UserName validation
      const isUserNameValid = await userNameSchema.safeParseAsync(value).then((res) => res.success);
      // Phone validation
      const isPhoneValid = await phoneSchema.safeParseAsync(value).then((res) => res.success);

      return isEmailValid || isUserNameValid || isPhoneValid;
    },
    {
      message: 'userEmptyError',
    }
  ),
  password: passwordSchema,
});

export const SignUpSchema = z
  .object({
    userInfo: z.string().refine(
      async (value) => {
        // Use async validation for email and phone, returning the final result
        const isEmailValid = await emailSchema.safeParseAsync(value).then((res) => res.success);
        const isPhoneValid = await phoneSchema.safeParseAsync(value).then((res) => res.success);

        return isEmailValid || isPhoneValid;
      },
      {
        message: 'emailOrPhonEmptyError',
      }
    ),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchError',
    path: ['confirmPassword'],
  });

export const SignUpPersonalSchema = z.object({
  firstname: firstnameSchema,
  lastname: lastnameSchema,
  username: userNameSchema,
  date: dateSchema,
});

export const SignUpCompanySchema = z.object({
  companyname: companyNameSchema,
  username: userNameSchema,
  date: dateSchema,
});

export const ActivationCodeSchema = z.object({
  activationCode: activationCodeSchema,
});

export const ForgotPasswordSchema = z.object({
  userInfo: z.string().refine(
    async (value) => {
      // Email validation
      const isEmailValid = await emailSchema.safeParseAsync(value).then((res) => res.success);
      // UserName validation
      const isUserNameValid = await userNameSchema.safeParseAsync(value).then((res) => res.success);
      // Phone validation
      const isPhoneValid = await phoneSchema.safeParseAsync(value).then((res) => res.success);

      return isEmailValid || isUserNameValid || isPhoneValid;
    },
    {
      message: 'userEmptyError',
    }
  ),
});

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchError',
    path: ['confirmPassword'],
  });
