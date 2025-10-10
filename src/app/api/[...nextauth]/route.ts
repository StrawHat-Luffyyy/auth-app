import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

// Define the structure of the user document from your database
interface UserDocument {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials were provided
        console.log("SERVER CHECK - MONGO_URI:", process.env.MONGO_URI);
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          await connectDB();

          const user = (await User.findOne({
            email: credentials.email,
          })) as UserDocument | null;

          // If no user is found, return null
          if (!user) {
            console.error("User not found with that email.");
            return null;
          }

          // Compare the provided password with the hashed password in the database
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // If passwords don't match, return null
          if (!isValid) {
            console.error("Password comparison failed: Invalid password.");
            return null;
          }

          // If authentication is successful, return the user object
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("🔥 CRITICAL ERROR in authorize function:", error);
          return null; // Return null on any critical failure
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };