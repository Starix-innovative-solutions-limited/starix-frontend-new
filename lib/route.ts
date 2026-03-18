// app/lib/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Replace this with a database call later
  const categories = [
    { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Fashion" },
    { id: "4fb96g75-6828-5673-c4gd-3d074g77bgb7", name: "Tech" },
    { id: "5hc07h86-7939-6784-d5he-4e185h88chc8", name: "Finance" },
    { id: "6id18i97-8040-7895-e6if-5f296i99did9", name: "Health" },
  ];

  return NextResponse.json(categories);
}