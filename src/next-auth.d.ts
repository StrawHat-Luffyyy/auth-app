// src/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id?: string | null;
      username?: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken` */
  interface JWT {
    username?: string;
    id?: string;
  }
}