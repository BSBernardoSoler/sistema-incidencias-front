import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { envs } from "@/config/envs";


export const authOptions : NextAuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/auth/loginUser`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();

        if (!res.ok || !data.token) {
          throw new Error(data.message || "Credenciales inválidas");
        }

        return {
          token: data.token,
          user: data.user,
        } as any;
      },
    }),
  ],
  pages: {
     signIn: `${process.env.NEXTAUTH_URL}/auth/login`,
  },
 callbacks: {
  async jwt({ token, user }: { token: JWT; user?: User }) {
    if (user) {
      token.token = (user as any).token;
      token.user = (user as any).user;
    }
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    return {
      ...session,
      token: token.token,
      user: token.user,
    };
  },
},
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60, // 1 hora
  },
};