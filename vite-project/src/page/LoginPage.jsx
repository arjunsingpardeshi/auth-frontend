import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, Github, Facebook, CircleUserRound } from 'lucide-react';
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
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

  const handleOAuth = (provider) =>{
    window.open(`${import.meta.env.VITE_BACKEND_URL}/${provider}`, "_self")
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
          <Button className="w-full cursor-pointer" disabled = {isLoggingIn}>
                {isLoggingIn ? <> <Loader2 className="h-5 w-5 animate-spin"/>Loading...</>  
                         : "Login"}</Button>

          <div className="relative flex items-center justify-center">
                <span className="absolute left-0 h-px w-full bg-muted-foreground/30" />
                <span className="relative z-10 bg-white px-2 text-sm text-muted-foreground">
                        Or sign in with
                </span>
          </div>
          <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  className="rounded-full shadow p-2 border hover:bg-gray-100 transition cursor-pointer"
                >
                  <FcGoogle size={24} />
                </button>
                {/* <button
                  type="button"
                  onClick={() => handleOAuth("facebook")}
                  className="rounded-full shadow p-2 border hover:bg-gray-100 transition"
                >
                  <Facebook size={20} className="text-blue-600" />
                </button> */}
                <button
                  type="button"
                  onClick={() => handleOAuth("github")}
                  className="rounded-full shadow p-2 border hover:bg-gray-100 transition cursor-pointer"
                >
                  <Github size={20} />
                </button>
          </div>
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