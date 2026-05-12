import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  secondName: z.string().min(2, 'Second name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  idNumber: z.string().min(5, 'ID number must be at least 5 characters'),
  country: z.string().min(2, 'Please select a country'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const purposeSchema = z.object({
  purposes: z.array(z.string()).min(1, 'Please select at least one purpose'),
});

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  secondName: z.string().min(2, 'Second name must be at least 2 characters'),
  idNumber: z.string().min(5, 'ID number must be at least 5 characters'),
  country: z.string().min(2, 'Please select a country'),
});
