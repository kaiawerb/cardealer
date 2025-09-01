// app/(auth)/sign-in/page.tsx
"use client"

import AuthForm from "@/components/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth"
import type { SignInValues } from "@/lib/auth-types"
import { signInSchema } from "@/lib/validations"

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
