import { z } from 'zod';
import { validation } from '../validation/validationMessages';

export const shippingSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: validation.MinChar(2) })
    .max(50, { message: validation.MaxChar(50) }),
  lastName: z
    .string()
    .min(2, { message: validation.MinChar(2) })
    .max(50, { message: validation.MaxChar(50) }),
  email: z.string().email({ message: validation.InvalidEmail }),
  phone: z
    .string()
    .min(6, { message: validation.MinChar(6) })
    .max(24, { message: validation.MaxChar(24) }),
  address: z
    .string()
    .min(5, { message: validation.MinChar(5) })
    .max(120, { message: validation.MaxChar(120) }),
  city: z.string().min(2, { message: validation.MinChar(2) }),
  state: z.string().min(1, { message: validation.Required }),
  zipCode: z.string().min(2, { message: validation.MinChar(2) }),
  country: z.string().min(2, { message: validation.MinChar(2) }),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export default shippingSchema;
