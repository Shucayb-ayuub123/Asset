import {DB} from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { device_name, device_type, functions, location, status } =
      await request.json();

    const cleint = await DB.execute(
      "INSERT INTO otherdevice (device_name, device_type, functions ,location ,status ) values(?,?,?,?,?)",
      [device_name, device_type, functions, location, status],
    );

    if (!cleint) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json({ message: "Yes Registered" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const [cleints]:any = await DB.execute("SELECT * FROM otherdevice");

    if (!cleints) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json(cleints, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
