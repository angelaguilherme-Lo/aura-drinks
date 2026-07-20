import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "../components/cart/cart-provider";
import { CartShell } from "../components/cart/cart-shell";
import { AuthProvider } from "../components/auth/auth-provider";
import { FavoritesProvider } from "../components/favorites/favorites-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <CartShell>{children}</CartShell>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}