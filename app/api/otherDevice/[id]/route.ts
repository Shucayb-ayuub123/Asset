import { DB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const [clients]: any = await DB.execute(
      "SELECT * FROM otherdevice WHERE id = ?",
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

    const {
    device_name,
    device_type,
    functions,
    location,
    status,
    
    } = await request.json();

   await DB.execute(
  `UPDATE otherdevice 
   SET device_name = ?, device_type = ?, functions = ?, 
       location = ?, status = ?
   WHERE id = ?`,
  [
    device_name,
    device_type,
    functions,
    location,
    status,
    id,
  ]
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

    const clients = await DB.execute("DELETE  FROM otherdevice WHERE id = ?", [
      id,
    ]);

    return NextResponse.json(
      { message: "Delete successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
