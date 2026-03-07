import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PublicPath = [
  "/Login",
  "/api/admin-register",
  "/api/user-login",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow public routes
  if (PublicPath.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // ❌ No token → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  try {
    const decode: any = jwt.verify(token, process.env.JW_SECRET!);

    // ❌ If USER tries to access Admin page → block
    if (decode.role == "user" && pathname.startsWith("/Admin")) {
      return NextResponse.redirect(new URL("/Users", req.url));
    }

    // ✅ Admin can access everything (Admin + Users)
    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: ["/Admin", "/Admin/:path*"],
};