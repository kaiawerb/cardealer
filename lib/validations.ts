import { number, z } from "zod"

export const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string(),
  password: z.string().min(6),
  dealershipName: z.string().optional(),
  dealershipSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
