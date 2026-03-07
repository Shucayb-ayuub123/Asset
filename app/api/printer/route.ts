import {DB} from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { printer_name, Brand, model, Scanner, color, Location, status } =
      await request.json();

    const cleint = await DB.execute(
      "INSERT INTO printer (printer_name, brand, model ,scanner ,color,status,location ) values(?,?,?,?,?,?,?)",
      [printer_name, Brand, model, Scanner, color, status,Location ],
    );

    if (!cleint) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json({ message: "printer Registered" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {

  try {

    const [cleints]:any = await DB.execute("SELECT * FROM printer ")    

    if (!cleints) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json(cleints ,  { status: 201 });
  } catch(error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
