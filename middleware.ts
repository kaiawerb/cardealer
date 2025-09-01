import type { NextRequest } from "next/server"
// use UMA das linhas abaixo, conforme seu setup:
import { withAuthMiddleware } from "@/auth-middleware" // se alias "@" aponta para a raiz
// import { withAuthMiddleware } from "./auth-middleware"; // se sem alias

export async function middleware(req: NextRequest) {
  return withAuthMiddleware(req)
}

export const config = { matcher: ["/dashboard/:path*"] }
