// lib/config.ts
import { z } from "zod"

// Definindo o schema das variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().nonempty("DATABASE_URL é obrigatória"),
})

// Faz a validação do process.env
const env = envSchema.parse(process.env)

// Exporta um objeto config organizado
export const config = {
  database: {
    url: env.DATABASE_URL,
  },
}

export type Config = typeof config
