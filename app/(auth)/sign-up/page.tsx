// app/(auth)/sign-up/page.tsx
"use client"

import AuthForm from "@/components/AuthForm"
import { signUpWithCredentials } from "@/lib/actions/auth"
import { z } from "zod"
import type { SignUpValues } from "@/lib/auth-types"
import { signUpSchema } from "@/lib/validations"

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
