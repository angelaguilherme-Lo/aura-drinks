"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DemoUser = {
  name: string;
  email: string;
  provider: "email" | "google";
};

type AuthContextValue = {
  user: DemoUser | null;
  signUp: (input: { name: string; email: string; password: string }) => void;
  signIn: (input: { email: string; password: string }) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signUp: ({ name, email }) => {
        setUser({
          name: name.trim() || "Aura Guest",
          email: email.trim().toLowerCase(),
          provider: "email",
        });
      },
      signIn: ({ email }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const derivedName =
          normalizedEmail.split("@")[0].replace(/[._-]/g, " ").trim() || "Aura Guest";

        setUser({
          name: derivedName
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          email: normalizedEmail,
          provider: "email",
        });
      },
      signInWithGoogle: () => {
        setUser({
          name: "Aura Demo",
          email: "demo.aura@gmail.com",
          provider: "google",
        });
      },
      signOut: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}