import { z } from 'zod';
// Validators
import { categorySchema, headlineSchema, fieldSchema, overviewSchema, skillSchema, endDateSchema, startDateSchema } from '@/validators/validator';

export const EditProfileSchema = z.object({
  category: categorySchema,
  headline: headlineSchema,
  overview: overviewSchema,
});

export const EducationSchema = z
  .object({
    school: fieldSchema,
    degree: fieldSchema,
    fieldOfStudy: fieldSchema,
    startDate: startDateSchema,
    endDate: endDateSchema.optional(),
    grade: z.string().optional(),
    description: z.string().max(200, 'descriptionToolong').optional(),
    isCurrent: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrent) return true;
      return !!data.endDate;
    },
    {
      path: ['endDate'],
      message: 'endDateRequired',
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate) return true;
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return startDate <= endDate;
    },
    {
      message: 'startDateAfterEndDate',
      path: ['endDate'],
    }
  );

export const PositionSchema = z
  .object({
    title: fieldSchema,
    employmentType: fieldSchema,
    jobType:fieldSchema,
    companyOrOrganization: fieldSchema,
    startDate: startDateSchema,
    endDate: endDateSchema,
    country:fieldSchema.optional(),
    city:fieldSchema.optional(),
    description: z.string().max(200, 'descriptionToolong').optional(),
    isCurrent: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrent) return true;
      return !!data.endDate;
    },
    {
      path: ['endDate'],
      message: 'endDateRequired',
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate) return true;
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return startDate <= endDate;
    },
    {
      message: 'startDateAfterEndDate',
      path: ['endDate'],
    }
  );

// export const CareerBreakSchema = z
//   .object({
//     startDate: startDateSchema,
//     endDate: endDateSchema,
//     description: z.string().max(200, 'descriptionToolong').optional(),
//   })
//   .refine(
//     (data) => {
//       const startDate = new Date(data.startDate);
//       const endDate = new Date(data.endDate);
//       return startDate <= endDate; // Check if start date is not after end date
//     },
//     {
//       message: 'startDateAfterEndDate',
//       path: ['endDate'], // Error will show under `endDate` if validation fails
//     }
//   );

// export const coursesSchema = z.object({
//   name: fieldSchema,
//   associated: fieldSchema,
// });

// export const LicensesCertificationsSchema = z.object({
//   name: fieldSchema,
//   issuingOrganization: fieldSchema,
//   issueDate: startDateSchema,
// });
