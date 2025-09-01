// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
// importe do seu caminho real:
import { authOptions } from "@/auth" // ou "../../../auth" se não usar alias

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
