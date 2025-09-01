"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type Path,
  type UseFormReturn,
  type Resolver,
} from "react-hook-form"
import type { ZodType } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Props<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  type: "SIGN_IN" | "SIGN_UP"
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter()
  const isSignIn = type === "SIGN_IN"

  // ✅ useForm com 3 genéricos: <T, any, T>
  //    - garante que control seja Control<T, any, T>
  //    - garante que handleSubmit aceite SubmitHandler<T>
  const form: UseFormReturn<T, any, T> = useForm<T, any, T>({
    // cast necessário porque zodResolver retorna Resolver<TFieldValues>
    resolver: zodResolver(schema) as unknown as Resolver<T, any, T>,
    // se o TS reclamar aqui, você pode manter esse cast:
    defaultValues: defaultValues as T,
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data)

    if (result.success) {
      toast.success(
        isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up."
      )
      router.push(isSignIn ? "/dashboard" : "/sign-in")
    } else {
      toast.error(result.error ?? "An error occurred.")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {isSignIn ? "Welcome back" : "Create your account"}
      </h1>

      <p className="text-sm text-muted-foreground">
        {isSignIn
          ? "Access your dashboard and manage your inventory."
          : "Fill in the fields below to get started."}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {/* SIGN UP: Name */}
          {!isSignIn && (
            <FormField
              control={form.control}
              name={"name" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Email */}
          <FormField
            control={form.control}
            name={"email" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name={"password" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm
