import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { Link } from 'react-router-dom'
import {Code, Eye, EyeOff, Loader2} from "lucide-react"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from '../store/useAuthStore'

const SignUpSchema = z.object({
    email: z.string().email("enter valid email"),
    name: z.string().min(4, "name have atleast 4 character"),
    password: z.string().min(6, "password have atleast 6 character"),
    confirmPassword: z.string().min(6, "confirm password is required")
}).refine((data) => data.password===data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password and confirm password does not match"
});

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {isSigninUp, signup} = useAuthStore()
  const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(SignUpSchema)})

  const onSubmit = async (data) => {
    try {
      await signup(data)
      console.log("sign up data in on submit",data);
      
    } catch (error) {
      console.error("error in on submit", e=error)
    }
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md" >
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                {/* Full Name */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name" className=" ">Full Name</Label>
                    <Input {...register("name")} type="text" id="name" placeholder="John Doe" />
                    {errors.name && (<p className="text-sm text-red-500">{errors.name.message}</p>)}
                </div>
        
                {/* Email */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register("email")} type="email" id="email" placeholder="you@example.com" />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
        
                {/* Password */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    </div>
                    
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
    
              {/* Confirm Password */}
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    id="confirm-password"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>
    
              {/* Sign Up Button */}
              <Button className="w-full" disabled={isSigninUp}>
                {isSigninUp ? <> <Loader2 className="h-5 w-5 animate-spin"/>Loading...</>  
                         : "Sign Up"}</Button>

              {/* Login Link */}
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </form>
    </div>
  )
}

export default SignUpPage