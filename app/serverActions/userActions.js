"use server";

import { auth, signIn, signOut } from "@/auth";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connectdb";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function registerUser(info) {
  try {
    await connectDB();
    const { username, email, password } = info;
    if (!username || !email || !password)
      return { error: "All field cannot be empty" };
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return { error: "Not valid value" };
    if (username.trim().length < 5 || username.trim().length > 20)
      return { error: "Username must between 5 and 20 characters" };
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) return { error: "Email not valid" };
    if (password.trim().length < 8 || password.trim().length > 30)
      return { error: "Password must between 8 and 30 characters" };
    const exist = await User.findOne({ $or: [{ email, username }] });
    if (exist) return { error: "User already existed" };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function handleSignOut() {
  console.log("signout");
  try {
    const { user } = await auth();
    if (!user) return;
    await signOut();
  } catch (error) {
    console.error(error);
  }
  redirect("/");
}
