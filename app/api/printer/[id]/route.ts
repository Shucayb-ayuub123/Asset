import { DB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const [clients]: any = await DB.execute(
      "SELECT * FROM printer WHERE id = ?",
      [id],
    );

    if (clients.length === 0) {
      return NextResponse.json(
        { message: "Computer not found" },
        { status: 404 },
      );
    }

    console.log(clients);

    return NextResponse.json(clients[0], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const { printer_name, brand, model, scanner, color, status, location } =
      await request.json();

    const clients = await DB.execute(
      `UPDATE printer 
SET 
  printer_name = ?, 
  brand = ?, 
  model = ?, 
  scanner = ?, 
  color = ?, 
  status = ?, 
  location = ?
WHERE id = ?`,
      [printer_name, brand, model, scanner, color, status, location, id],
    );

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const clients = await DB.execute("DELETE FROM printer  WHERE id = ?", [id]);

    return NextResponse.json(
      { message: "Delete successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
