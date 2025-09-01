// app/(auth)/sign-in/page.tsx
"use client"

import AuthForm from "@/components/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth"
import { z } from "zod"
import type { SignInValues } from "@/lib/auth-types"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Page() {
  const defaults: SignInValues = { email: "", password: "" }

  return (
    <AuthForm<SignInValues>
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={defaults}
      onSubmit={signInWithCredentials}
    />
  )
}
