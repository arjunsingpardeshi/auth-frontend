import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlignVerticalSpaceBetweenIcon, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { useAuthStore } from '../store/useAuthStore';


const SignUpSchema = z.object({
    email: z.string().email("enter valid email"),
    password: z.string().min(6, "password have atleast 6 character"),
})

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(SignUpSchema)})

  
  const {isLoggingIn, login} = useAuthStore()
  const onSubmit = async (data) => {
    
    try {
      await login(data)
      console.log(data);
      
    } catch (error) {
      console.log("error in login on submit", error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md" >
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
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
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <Button className="w-full" disabled = {isLoggingIn}>
                {isLoggingIn ? <> <Loader2 className="h-5 w-5 animate-spin"/>Loading...</>  
                         : "Login"}</Button>

          {/* SignUp Link */}
          <p className="text-sm text-center text-muted-foreground">
            Not have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </form>
    </div>
  )
}

export default LoginPage