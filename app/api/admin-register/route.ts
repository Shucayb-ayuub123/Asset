import { DB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const { username, password, role } = await request.json();

    if (!username || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const [rows]: any = await DB.execute(
      "SELECT * FROM users WHERE username = ?", 
      [username],
    );

    console.log(rows)

    const user = rows[0];

    if (user) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 },
      );
    }

    const hashPass = await bcrypt.hash(password, 10);

    const users = await DB.execute(
      "INSERT INTO users (username , password , role) values(?,?,?) ",
      [username, hashPass, role],
    );
    return NextResponse.json(
      { message: "Regitered Successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
