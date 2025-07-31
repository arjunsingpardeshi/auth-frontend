// components/Navbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

function Navbar() {
    const {authUser} = useAuthStore()
  return (
    <header className="w-full border-b shadow-sm px-4 py-2 flex justify-between items-center bg-white">
      {/* Logo or Brand */}
      <div className="text-xl font-bold text-gray-800">MyApp</div>

      {/* Right Side: Profile Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  } alt="@profile" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 mr-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Navbar