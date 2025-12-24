import { cn } from "@/lib/utils"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import Password from "@/components/ui/Password";
 
const formSchema = z.object({
  name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),

    email: z
      .string()
      .email({ message: "Please enter a valid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),

    repassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
})

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
  })

  const onSubmit = (data : z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="name" type="name" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email" type="email" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        This is your public display email.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
             <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        This is your public display password.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
             <FormField
                control={form.control}
                name="repassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        This is your public display re password.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
          </form>
        </Form>
          
        </div>
       <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}
