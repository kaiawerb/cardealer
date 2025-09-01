// lib/auth-types.ts
export type SignInValues = {
  email: string
  password: string
}

export type SignUpValues = {
  name: string
  email: string
  password: string
  dealershipName?: string
  dealershipSlug?: string
}
