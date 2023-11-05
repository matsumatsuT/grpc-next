import { NextResponse } from 'next/server'
export async function GET() {
  const res = await fetch("https://httpbin.org/get", {
  })
  const data = await res.json()

  return Response.json({ data })
}
