import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { z } from "zod"
import bcrypt from "bcrypt"

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  dealershipName: z.string().min(2),
  dealershipSlug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
})

export default function SignUpPage() {
  async function doSignUp(formData: FormData) {
    "use server"
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      dealershipName: String(formData.get("dealershipName") ?? ""),
      dealershipSlug: String(formData.get("dealershipSlug") ?? ""),
    }

    const parsed = signUpSchema.safeParse(raw)
    if (!parsed.success) {
      // Opcional: tratar erro via cookies/searchParams
      redirect("/sign-up?error=validation")
    }

    const { name, email, password, dealershipName, dealershipSlug } =
      parsed.data

    // garante slug único
    const slugExists = await prisma.dealership.findUnique({
      where: { slug: dealershipSlug },
    })
    if (slugExists) redirect("/sign-up?error=slug-in-use")

    const emailExists = await prisma.user.findUnique({ where: { email } })
    if (emailExists) redirect("/sign-up?error=email-in-use")

    const passwordHash = await bcrypt.hash(password, 10)

    const dealership = await prisma.dealership.create({
      data: {
        name: dealershipName,
        slug: dealershipSlug,
      },
    })

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        memberships: {
          create: { dealershipId: dealership.id, role: "OWNER" },
        },
      },
    })

    // redireciona para login já com tudo pronto
    redirect("/sign-in?success=account-created")
  }

  return (
    <form action={doSignUp} className="space-y-4">
      <h1 className="text-2xl font-semibold">Criar conta</h1>
      <div>
        <label className="block text-sm mb-1">Seu nome</label>
        <input name="name" required className="w-full border rounded p-2" />
      </div>
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
      <hr className="my-2" />
      <div>
        <label className="block text-sm mb-1">Nome da revenda</label>
        <input
          name="dealershipName"
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">
          Slug (url, ex: super-speed-orlando)
        </label>
        <input
          name="dealershipSlug"
          required
          className="w-full border rounded p-2"
        />
      </div>
      <button className="w-full bg-black text-white rounded py-2">
        Criar conta
      </button>

      <p className="text-sm text-center">
        Já tem conta?{" "}
        <a className="underline" href="/sign-in">
          Entrar
        </a>
      </p>
    </form>
  )
}
