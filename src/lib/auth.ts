import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('=== NEXTAUTH AUTHORIZE DEBUG START ===');
        console.log('[NEXTAUTH] Authorize callback called');
        
        // Log incoming credentials
        console.log('[NEXTAUTH] Credentials received:', {
          email: credentials?.email,
          passwordLength: credentials?.password?.length,
          passwordPreview: credentials?.password ? credentials.password.substring(0, 2) + '***' : 'undefined',
          hasEmail: !!credentials?.email,
          hasPassword: !!credentials?.password
        });

        if (!credentials?.email || !credentials?.password) {
          console.log('[NEXTAUTH] ❌ Missing credentials - returning null');
          console.log('=== NEXTAUTH AUTHORIZE DEBUG END ===');
          return null;
        }

        // Import Prisma client only at runtime, not at build time
        const { prisma } = await import("@/lib/prisma");

        console.log('[NEXTAUTH] Fetching user by email:', credentials.email);
        console.log('[NEXTAUTH] Using Prisma query: prisma.user.findUnique({ where: { email: ... } })');
        
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log('[NEXTAUTH] Prisma user lookup result:', {
          userFound: !!user,
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.name,
          userRole: user?.role,
          hasPasswordField: !!user?.password,
          passwordLength: user?.password?.length,
          passwordPreview: user?.password ? user.password.substring(0, 20) + '...' : 'undefined'
        });

        if (!user) {
          console.log('[NEXTAUTH] ❌ User not found with email:', credentials.email, '- returning null');
          console.log('=== NEXTAUTH AUTHORIZE DEBUG END ===');
          return null;
        }

        if (!user.password) {
          console.log('[NEXTAUTH] ❌ User has no password field - returning null');
          console.log('=== NEXTAUTH AUTHORIZE DEBUG END ===');
          return null;
        }

        console.log('[NEXTAUTH] User found successfully');
        console.log('[NEXTAUTH] Comparing passwords using bcrypt.compare(plainPassword, hashedPassword)');
        console.log('[NEXTAUTH] Plain password length:', credentials.password.length);
        console.log('[NEXTAUTH] Hashed password length:', user.password.length);
        console.log('[NEXTAUTH] Hashed password preview:', user.password.substring(0, 30) + '...');

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log('[NEXTAUTH] bcrypt.compare result:', isPasswordValid);

        if (!isPasswordValid) {
          console.log('[NEXTAUTH] ❌ Password comparison failed - returning null');
          console.log('=== NEXTAUTH AUTHORIZE DEBUG END ===');
          return null;
        }

        console.log('[NEXTAUTH] ✅ Authentication successful for user:', user.email);
        console.log('[NEXTAUTH] Returning user object:', {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });
        console.log('=== NEXTAUTH AUTHORIZE DEBUG END ===');
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
