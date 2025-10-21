import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsAdmin: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // ✅ check if this user is the admin
      if (firebaseUser?.email === "johnsondravid143@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
    } catch (error: any) {
      console.error(error);
      toast.error("Google Sign-in failed.");
    }
  };

  // ✅ manual admin sign-in (email/password)
  const signInAsAdmin = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      if (email === "johnsondravid143@gmail.com") setIsAdmin(true);
      toast.success("Signed in as Admin!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Admin login failed.");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAdmin(false);
      toast.success("Signed out successfully.");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, signInWithGoogle, signInAsAdmin, signOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
