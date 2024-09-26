import { z } from 'zod';

export const UserProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(20, { message: 'Username must be at most 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobile: z.string().min(5, { message: 'Mobile number is required' }),
  motto: z.string().optional(),
});

export type UserProfileProps = z.infer<typeof UserProfileSchema>;
