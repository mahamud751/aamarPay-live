import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      role?: string;
      photos?: { title: string; src: string }[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
    photos?: { title: string; src: string }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
