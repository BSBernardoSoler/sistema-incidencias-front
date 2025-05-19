import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: number;
      nombre: string;
      email: string;
      role:string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    user: {
      id: number;
      nombre: string;
      email: string;
      role:string;
    };
  }
}