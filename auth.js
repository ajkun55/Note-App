import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./utils/connectdb";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;
          const isCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrect) return null;
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
});
