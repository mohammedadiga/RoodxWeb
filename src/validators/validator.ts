import { z } from 'zod';
// Hook
import handleCountryPhoneError from '@/lib/countryPhoneValid';

const fieldSchema = z
  .string()
  .nonempty('fieldRequired') // Ensure the text is not empty
  .min(3, 'field3characters') // Ensures the text has at least 3 characters
  .max(50, 'field50TooLong') // Ensures the text does not exceed 50 characters
  .regex(/^[^\d]+$/, { message: 'fieldFormatError' }); // Ensures the text does not contain any digits

// Email validation schema
const emailSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .email({ message: 'invalidEmailFormat' }) // Custom error message for invalid email format
  .min(5, { message: 'emailTooShort' }) // Min length of 5 characters for email
  .max(255, { message: 'emailTooLong' }); // Max length of 255 characters for email

// User name validation schema
const userNameSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .regex(/^[A-Za-z](?:[A-Za-z0-9_]+)*$/, { message: 'invalidUserNameFormat' }) // Valid username format
  .min(3, { message: 'userNameTooShort' }) // Min length of 3 characters for username
  .max(20, { message: 'userNameTooLong' }); // Max length of 20 characters for username

// Password validation schema
const passwordSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .nonempty({ message: 'passwordEmptyError' }) // Ensure password is not empty
  .min(6, { message: 'password6CharactersError' }) // Min length of 6 characters
  .max(255, { message: 'passwordTooLongError' }) // Max length of 255 characters
  .regex(/^(?=.*[A-Z])/, { message: 'passwordRequiresUppercase' }) // Must contain at least one uppercase letter
  .regex(/^(?=.*[a-z])/, { message: 'passwordRequiresLowercase' }) // Must contain at least one lowercase letter
  .regex(/^(?=.*\d)/, { message: 'passwordRequiresNumber' }) // Must contain at least one number
  .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, { message: 'passwordRequiresSpecialChar' }); // Must contain at least one special character

// Phone validation schema
const phoneSchema = z.string().refine(
  async (value) => {
    try {
      // Async phone validation
      const isValid = await handleCountryPhoneError(value);
      return isValid; // returns true or false based on phone validation
    } catch (e) {
      return false; // In case of an error, return false
    }
  },
  { message: 'invalidPhoneNumber' } // Custom error message for invalid phone number
);

// First name validation: must be between 2 and 30 characters, allows letters (both English and Arabic) and spaces
const firstnameSchema = z
  .string()
  .min(2, { message: 'firstnameTooShort' }) // Min length of 2 characters
  .max(30, { message: 'firstnameTooLong' }) // Max length of 30 characters
  .regex(/^[a-zA-Z\u0621-\u064A\s]+$/, { message: 'firstnameFormatError' }); // Allows letters (English & Arabic) and spaces

// Last name validation: must be between 2 and 30 characters, allows letters (both English and Arabic) and spaces
const lastnameSchema = z
  .string()
  .min(2, { message: 'lastnameTooShort' }) // Min length of 2 characters
  .max(30, { message: 'lastnameTooLong' }) // Max length of 30 characters
  .regex(/^[a-zA-Z\u0621-\u064A\s]+$/, { message: 'lastnameFormatError' }); // Allows letters (English & Arabic) and spaces

const companyNameSchema = z
  .string()
  .nonempty({ message: 'companynameEmptyError' })
  .min(3, { message: 'companynameTooShortError' }) // Message for short company name
  .max(20, { message: 'companynameTooLongError' }) // Message for long company name
  .regex(/^[A-Za-z0-9_]+$/, {
    // Allow letters, numbers, and underscores
    message: 'companynameFormatError', // Invalid format
  });

const dateSchema = z
  .string()
  .min(1, { message: 'requiredDate' }) // Check if the date is provided
  .refine((val) => !isNaN(Date.parse(val)), {
    message: 'invalidDate', // Validate if the date is a valid date format
  })
  .refine((val) => new Date(val) <= new Date(), {
    message: 'futureDate', // Ensure the birthdate is not in the future
  })
  .refine(
    (val) => {
      const birthDate = new Date(val);
      const minAge = 13;
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear(); // Calculate age

      // If age is more than 13, it's valid. If exactly 13, ensure the Date is before today
      return age > minAge || (age === minAge && today >= new Date(birthDate.setFullYear(today.getFullYear())));
    },
    {
      message: 'ageRestriction', // Ensure user is at least 13 years old
    }
  );

const startDateSchema = z
  .string()
  .min(1, { message: 'startDateRequired' }) // Ensure the date is provided
  .refine((val) => !isNaN(Date.parse(val)), {
    message: 'invalidDate', // Check for valid date format
  })
  .refine(
    (val) => {
      const date = new Date(val);
      return date <= new Date(); // Ensure the date is not in the future
    },
    {
      message: 'futureDate', // Error message if the date is in the future
    }
  );

  const endDateSchema = z
  .string()
  .optional()
  .refine((val) => !val || !isNaN(Date.parse(val)), {
    message: 'invalidDate',
  });

const activationCodeSchema = z
  .string()
  .nonempty({ message: 'EmptyError' }) // Code cannot be empty
  .length(6, { message: '6CharactersError' }) // Code must be exactly 6 characters long
  .regex(/^\d+$/, { message: 'NumberError' }); // Code must contain only digits

const categorySchema = z
  .string()
  .max(20, { message: 'nameError' }) // Error message for exceeding 20 characters
  .regex(/^[^\d]+$/, { message: 'categoryFormatError' }) // Error message for invalid category format (contains digits)
  .or(z.literal('')); // Allows an empty string as a valid value

const headlineSchema = z.string().max(150, { message: 'headlineError' }); // Error message for exceeding 150 characters

const overviewSchema = z.string().max(255, { message: 'overviewError' }); // Error message for exceeding 255 characters

const skillSchema = z
  .string()
  .regex(/^[^\d]+$/, { message: 'skillFormatError' }) // Ensure the skill does not contain numbers
  .or(z.literal('')); // Allow an empty string for skills

// Exporting schemas
export {
  fieldSchema,
  emailSchema,
  userNameSchema,
  passwordSchema,
  phoneSchema,
  firstnameSchema,
  lastnameSchema,
  companyNameSchema,
  dateSchema,
  startDateSchema,
  endDateSchema,
  activationCodeSchema,
  categorySchema,
  headlineSchema,
  overviewSchema,
  skillSchema,
};
