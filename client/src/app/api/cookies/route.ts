import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("UserId");
  cookieStore.delete("UserRole");
  cookieStore.delete("sessionToken");

  return NextResponse.json({ message: "Cookies cleared" }, { status: 200 });
}
