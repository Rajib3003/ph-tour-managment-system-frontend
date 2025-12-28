import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
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
import { Link, useNavigate } from "react-router";
import Password from "@/components/ui/Password";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useLoginMutation} from "@/redux/features/auth/auth.api";



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate()
    const form = useForm({    
    defaultValues: {      
      email: "",
      password: "",      
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    const loginInfo = {      
      email: data.email,
      password: data.password
    }

   
    try {
      const result = await login(loginInfo).unwrap()
      console.log(result)
      toast.success("User login Successfully **!")
    } catch (error) {
      console.log(error)
      toast.error("Login Error **!")
      // if(error.status === 500){
        navigate("/verify", {state:data.email})
      // }
    }
    }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
         <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6">            
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
          
                <Button type="submit">Submit</Button>
          </form>
        </Form>
          
      </div>
       <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  )
}
