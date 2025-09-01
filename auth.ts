// lib/auth.ts
import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email e Senha",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { memberships: true },
        })
        if (!user || !user.passwordHash) return null

        const ok = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!ok) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatarUrl ?? null,
          memberships: user.memberships.map((m) => ({
            dealershipId: m.dealershipId,
            role: m.role as "OWNER" | "ADMIN" | "MANAGER" | "SALES" | "VIEWER",
          })),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user // tipado
      return token as JWT
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user // tipado
      return session
    },
  },
  pages: {
    signIn: "/sign-in", // rota pública de login (vamos criar)
  },
}
