// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

type Membership = {
  dealershipId: string
  role: "OWNER" | "ADMIN" | "MANAGER" | "SALES" | "VIEWER"
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string | null
      email: string
      image?: string | null
      memberships: Membership[]
    }
  }

  interface User {
    id: string
    name: string | null
    email: string
    image?: string | null
    memberships: Membership[]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: import("next-auth").User
  }
}
