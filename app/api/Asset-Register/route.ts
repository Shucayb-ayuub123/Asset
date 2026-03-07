import {DB} from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const {
      com_name,
      com_version,
      os_version,
      cpu,
      storage,
      ant_virus,
      days_remaining,
    } = await request.json();

    const cleint = await DB.execute(
      "INSERT INTO computer (com_name, com_version, cpu ,storage ,ant_virus,days_remaining,os_version ) values(?,?,?,?,?,?,?)",
      [com_name, com_version, cpu, storage, ant_virus, days_remaining, os_version],
    );

    if (!cleint) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json({ message: "Asset Registered" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const [cleints] = await DB.execute("SELECT * FROM computer");

    if (!cleints) {
      return NextResponse.json({ message: "something wrong" }, { status: 400 });
    }

    return NextResponse.json(cleints, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
