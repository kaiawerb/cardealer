// auth-middleware.ts (RAIZ)
import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

type Role = "OWNER" | "ADMIN" | "MANAGER" | "SALES" | "VIEWER"
type Membership = { dealershipId: string; role: Role }

function hasAnyMembership(m: Membership[] | undefined) {
  return Array.isArray(m) && m.length > 0
}

export async function withAuthMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Protege /admin/**
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token?.user) {
      const url = new URL("/sign-in", req.url)
      url.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    const memberships = (token.user as { memberships?: Membership[] })
      .memberships
    if (!hasAnyMembership(memberships)) {
      const url = new URL("/sign-in", req.url)
      url.searchParams.set("error", "no-membership")
      return NextResponse.redirect(url)
    }

    // Exemplo por rota:
    // if (req.nextUrl.pathname.startsWith("/admin/users")) {
    //   const allowed = memberships!.some((m) => ["OWNER", "ADMIN"].includes(m.role));
    //   if (!allowed) return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    // }
  }

  return NextResponse.next()
}
