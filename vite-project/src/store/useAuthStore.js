import { axiosInstance } from "../util/axios.js";
import toast from "react-hot-toast";
import {create} from "zustand"



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({isCheckingAuth: true});        
        try {
            const res = await axiosInstance.get("/current-user")
            console.log("current-user data", res.data);
            set({authUser: res.data})
        } catch (error) {
         console.log(" Error in geting current-user data", error);
         set({authUser:null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    },

    
    signup: async (data) => {
        set({isSigninUp: true})

        try {
            const res = await axiosInstance.post("/register", data)
            console.log("signup data ", res.data)
           // set({authUser: res.data})
            toast.success(res.data.message)
        } catch (error) {
            set({authUser: null})
            console.log("error in sign up", error)
            toast.error("error in sign up")
        }
        finally{
            set({isSigninUp: false})
        }
    },

    login: async (data) => {
        
        set({isLoggingIn: true});

        try {
            const res = await axiosInstance.post("/login", data)
            console.log("user login ", res.data);
            set({authUser: res.data})
            toast.success(res.data.message)
        } catch (error) {
            set({authUser: null})
            console.log("error in login ", error)
            toast.error("error in login")
        }
        finally{
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/logout")
            set({authUser: null})
            toast.success(res.data.message)
        } catch (error) {
            console.log("error in logout", error);
            toast.error("error in logout")            
        }
    }
}))