/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { useForm, type SubmitHandler } from "react-hook-form"
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
import config from "@/config";
import type { ILogin } from "@/types";




export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
 
  const navigate = useNavigate()
    const form = useForm({    
    defaultValues: {      
      email: "ahmedrajib255@gmail.com",
      password: "P@ssw0rd",      
    },
  })
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    // const userInfo = {      
    //   email: data.email,
    //   password: data.password
    // }

   
    try {
      const res = await login(data).unwrap() as any
      if(res?.success){
        toast.success("User login Successfully **!")
        navigate("/")
      }
      
    } catch (error: any) {
      console.log(error)
      // toast.error("Login Error **!")
      if(error.status === 500){
        navigate("/verify", {state:data.email})
      }

      if(error?.data?.error === "User is not Verified Yet"){
        toast.error("User is not Verified Yet")
        navigate("/verify", {state:data.email})
      }else if (error?.data?.message === "Password does not match"){
        toast.error("Password does not match")
      }
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
          
                <Button type="submit">Login</Button>
          </form>
        </Form>

        <Button
        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        variant="link"
        type="button"
        >
          Login with Google
        </Button>
          
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
