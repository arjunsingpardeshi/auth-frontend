import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { Link, useNavigate} from 'react-router-dom'
import {Code, Eye, EyeOff, Loader2, Github, Facebook, CircleUserRound} from "lucide-react"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import { useAuthStore } from '../store/useAuthStore'

const SignUpSchema = z.object({
    email: z.string().email("enter valid email"),
    username: z.string().min(4, "name have atleast 4 character"),
    password: z.string().min(6, "password have atleast 6 character"),
    confirmPassword: z.string().min(6, "confirm password is required")
}).refine((data) => data.password===data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password and confirm password does not match"
});

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {signUpSuccess, isSigninUp, signup} = useAuthStore()
  const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(SignUpSchema)})
  const navigate = useNavigate()
  
  const onSubmit = async (data) => {
    try {
     // console.log("sign up data in on submit",data);
      const {confirmPassword, ...newData} = data
    //  console.log("new data ", newData);
      
      await signup(newData)
      navigate("/login")
    } catch (error) {
      console.error("error in on submit", error)
    }
  }
  const handleOAuth = (provider) => {
      window.open(`${import.meta.env.VITE_BACKEND_URL}/${provider}`, "_self")
  } 

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md" >
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                {/* user Name */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="username" className=" ">User Name</Label>
                    <Input {...register("username")} type="text" id="username" placeholder="Tony Stark" />
                    {errors.username && (<p className="text-sm text-red-500">{errors.username.message}</p>)}
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
              <Button className="w-full cursor-pointer" disabled={isSigninUp}>
                {isSigninUp ? <> <Loader2 className="h-5 w-5 animate-spin"/>Loading...</>  
                         : "Sign Up"}</Button>

               {/* Social Sign Up */}
              <div className="relative flex items-center justify-center">
                  <span className="absolute left-0 h-px w-full bg-muted-foreground/30" />
                  <span className="relative z-10 bg-white px-2 text-sm text-muted-foreground">
                         Or sign up with
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
                      className="cursor-pointer rounded-full shadow p-2 border hover:bg-gray-100 transition"
                    >
                      <Github size={20} />
                    </button>
                </div>

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