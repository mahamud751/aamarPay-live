import NextAuth from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { User, Session, Account } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultJWT } from "next-auth/jwt";

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
    userId?: string;
    role?: string;
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account?: Account | null }) {
      if (account?.provider === "google") {
        try {
          const checkResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/check`,
            { email: user.email }
          );

          if (checkResponse.data.exists) {
            return true;
          }

          const payload = {
            name: user.name || "Unknown",
            email: user.email!,
            phone: "",
            password: "",
            provider: account.provider,
            providerId: account.providerAccountId,
            photos: user.image ? [{ title: "Profile", src: user.image }] : [],
            role: "user",
          };

          const registerResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
            payload
          );
          console.log(registerResponse);

          return true;
        } catch (error: unknown) {
          const typedError = error as Error & {
            response?: { data?: { message?: string } };
          };
          return `/auth/error?error=${encodeURIComponent(
            typedError.response?.data?.message || "Google sign-in failed"
          )}`;
        }
      }
      return true;
    },

    async jwt({
      token,
      account,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User;
      trigger?: string;
      session?: Session | null;
    }) {
      if (account && user) {
        try {
          const jwtResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/token`,
            { params: { email: user.email } }
          );

          token.accessToken = jwtResponse.data.accessToken;

          const userResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/check`,
            { email: user.email }
          );

          if (userResponse.data.exists) {
            token.userId = userResponse.data.user.id;
            token.role = userResponse.data.user.role;
          }
        } catch (error) {
          console.error("Error getting JWT token:", error);
        }
      }

      if (trigger === "update" && session?.accessToken) {
        token.accessToken = session.accessToken;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/check`,
            { email: session.user.email },
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          if (response.data.exists) {
            const userData = response.data.user;
            session.user.id = userData.id;
            session.user.role = userData.role;
            session.user.photos = userData.photos;
          }
        } catch (error) {
          console.error("Error fetching user data for session:", error);
        }
      }

      return session;
    },
  },
  session: { strategy: "jwt" as const, maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/signin", error: "/auth/error" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
