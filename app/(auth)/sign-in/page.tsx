// app/(auth)/sign-in/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState, FormEvent } from "react"

export default function SignInPage() {
  const search = useSearchParams()
  const callbackUrl = search.get("callbackUrl") || "/dashboard"
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr(null)
    setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    })

    setLoading(false)

    if (!res || res.error) {
      setErr("Credenciais inválidas")
      return
    }

    // redireciona manualmente
    window.location.href = res.url ?? callbackUrl
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-semibold">Entrar</h1>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Senha</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white rounded py-2"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <p className="text-sm text-center">
        Não tem conta?{" "}
        <a className="underline" href="/sign-up">
          Criar conta
        </a>
      </p>
    </form>
  )
}
