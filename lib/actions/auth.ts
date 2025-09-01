// lib/actions/auth.ts
"use client"
import { signIn } from "next-auth/react"
import type { SignInValues, SignUpValues } from "@/lib/auth-types"

export async function signInWithCredentials(
  data: SignInValues,
  redirectTo = "/admin/dashboard"
): Promise<{ success: boolean; error?: string }> {
  const res = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
    callbackUrl: redirectTo,
  })
  if (!res) return { success: false, error: "Erro inesperado." }
  if (res.error) return { success: false, error: res.error }
  if (res.url) window.location.href = res.url
  return { success: true }
}

export async function signUpWithCredentials(
  input: SignUpValues
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    return { success: false, error: data?.error ?? "Falha ao criar conta." }
  }
  return { success: true }
}
