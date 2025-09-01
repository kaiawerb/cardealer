// app/(auth)/sign-up/page.tsx
"use client"

import AuthForm from "@/components/AuthForm"
import { signUpWithCredentials } from "@/lib/actions/auth"
import { z } from "zod"
import type { SignUpValues } from "@/lib/auth-types"

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  dealershipName: z.string().optional(),
  dealershipSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
})

export default function Page() {
  const defaults: SignUpValues = {
    name: "",
    email: "",
    password: "",
    dealershipName: "",
    dealershipSlug: "",
  }

  return (
    <AuthForm<SignUpValues>
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={defaults}
      onSubmit={signUpWithCredentials}
    />
  )
}
