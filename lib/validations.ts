import { number, z } from "zod"

export const signUpSchema = z.object({
  fullname: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
  companyId: z.string(),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
