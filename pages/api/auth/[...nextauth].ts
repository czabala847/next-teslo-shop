import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "@/database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface User {
    id?: string;
    _id: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Custom login",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        // const user = { _id: "1", name: "J Smith", email: "jsmith@example.com" };
        // return user;

        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
  ],

  //Custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 2592000, ///30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user.email || "",
              user.name || ""
            );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
