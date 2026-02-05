import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { ROLES } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  {id: "home", href: "/", label: "Home", role: "PUBLIC"},
  { id: "about", href: "/about", label: "About", role: "PUBLIC" },  
  { id: "tours", href: "/tours", label: "Tours", role: "PUBLIC" },  
  { id: "admin", href: "/admin", label: "Dashboard", role: ROLES.ADMIN },  
  { id: "super-admin", href: "/admin", label: "Dashboard", role: ROLES.SUPER_ADMIN },  
  { id: "user", href: "/user", label: "Dashboard", role: ROLES.USER },  
];

export default function Navbar() {
  const userInfoResult = useUserInfoQuery(undefined)
  const dispatch = useAppDispatch()
  const [userLogout] = useLogoutMutation()

  const handleLogout = async () => {    
      await userLogout(undefined)    
      toast.success("User logged out successfully")
      dispatch(authApi.util.resetApiState())
  }


  return (
    <header className="border-b ">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.id}>
                      <NavigationMenuLink  
                        asChild                      
                        className="py-1.5"                        
                      >
                        <Link to={link.href}>{link.label}</Link>                        
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a className="text-primary hover:text-primary/90" href="/">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => {
                  const userRole = userInfoResult?.data?.data?.role
                  if (link.role === "PUBLIC" || link.role === userRole) {
                    return (
                      <NavigationMenuItem key={link.id}>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  }
                  return null
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle/>
          {userInfoResult?.data?.data?.email && (
            <Button onClick={handleLogout} className="text-sm">
            Logout
            </Button>
          )}
          {!userInfoResult?.data?.data?.email && (
          <Button asChild className="text-sm">
            <Link to="/login">Login</Link>
          </Button>
           )}
        </div>
      </div>
    </header>
  );
}
