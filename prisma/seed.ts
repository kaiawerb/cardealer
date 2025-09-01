import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const email = "kaiawerb5@gmail.com"
  const name = "Kaiã Werb"
  const password = "coxinha123"

  // 1) Dealership padrão
  const dealership = await prisma.dealership.upsert({
    where: { slug: "default-dealership" },
    update: {},
    create: {
      name: "Default Dealership",
      slug: "default-dealership",
      country: "BR",
      currency: "BRL",
      timeZone: "America/Sao_Paulo",
    },
  })

  // 2) Usuário + hash de senha
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash },
    create: {
      name,
      email,
      passwordHash,
      memberships: {
        create: { dealershipId: dealership.id, role: "OWNER" },
      },
    },
  })

  // 3) Garante membership OWNER idempotente
  await prisma.userOnDealership.upsert({
    where: {
      userId_dealershipId: {
        userId: user.id,
        dealershipId: dealership.id,
      },
    },
    update: { role: "OWNER" },
    create: {
      userId: user.id,
      dealershipId: dealership.id,
      role: "OWNER",
    },
  })

  console.log("✅ Seed OK")
  console.log(`Dealership: ${dealership.name} (${dealership.slug})`)
  console.log(`User: ${user.name} <${user.email}> (OWNER)`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
