import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/db";
import { AnyARecord } from "dns";
export const GET = async () => {

  try {
    
    const [computerRow] = await DB.execute(
      "SELECT * FROM computer ORDER  by  id DESC  limit 5",
    );
    const [TotalComputer]:any = await DB.execute(
      "SELECT count(id)  AS COMPUTOTAL from computer",
    );
    const [printerRow] = await DB.execute(
      "SELECT * FROM printer ORDER  by  id DESC  limit 5",
    );
    const [TotalPrinter]:any = await DB.execute(
      "SELECT count(id)  AS PRINTTOTAL from printer",
    );
    const [otherdevice] = await DB.execute(
      "SELECT * FROM otherdevice ORDER  by  id DESC  limit 5",
    );
    // const [TotalOther] = await DB.execute(
    //   "SELECT count(id)  AS OtherTOTAL from otherdevice",
    // );
  
    return NextResponse.json({

   computers: computerRow,
        totalComputers: TotalComputer[0].COMPUTOTAL,
        printer: printerRow,
        totalPrinters:TotalPrinter[0].PRINTTOTAL,
        otherDevices: otherdevice,

    } , {status : 200})
  } catch (error) {
     console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    )}
};
