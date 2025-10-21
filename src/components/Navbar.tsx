import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useShop } from "@/contexts/ShopContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();
  const { cart, wishlist } = useShop();

  return (
    <nav
      className="
        sticky top-0 z-50 
        backdrop-blur-md bg-white/70 dark:bg-gray-900/40
        border-b border-white/20 dark:border-gray-700/30
        shadow-[0_4px_10px_rgba(0,0,0,0.08)]
        transition-all duration-300
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
            <span className="text-xl font-bold tracking-tight">ShopHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Products
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge
                    className="
                      absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 
                      flex items-center justify-center bg-accent text-[10px]
                    "
                  >
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge
                    className="
                      absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 
                      flex items-center justify-center bg-accent text-[10px]
                    "
                  >
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 shadow-lg border border-border/50 bg-background/95 backdrop-blur-sm"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">
                      {user.displayName || "Admin User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center cursor-pointer text-primary font-medium"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={signInWithGoogle}
                variant="default"
                className="font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
