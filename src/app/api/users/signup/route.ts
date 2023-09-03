import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// I Need to grab request and response
import { NextRequest, NextResponse } from "next/server";
//password Encrpting,we donot need jwt because of no signup

import bcryptjs from "bcryptjs";

connect();

//handling post request because of data is coming
export async function POST(request: NextRequest) {
  try {
    // how we grab data from body??
    const reqBody = await request.json();
    // We need to extract some stuff

    const { username, email, password } = reqBody;
    console.log(reqBody);

    //check if already exist.await is used for returning query
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already Exist" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // save user in database,create user

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // how will be handling
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
