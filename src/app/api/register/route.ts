import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/dbConnect";

export async function POST(request: Request) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }
    await connectDB();

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User Already Exists",
        },
        {
          status: 401,
        }
      );
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //New User
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.log("Register Error ", error);
    return NextResponse.json(
      {
        error: "Something went Wrong",
      },
      {
        status: 500,
      }
    );
  }
}
