import { NextResponse, NextRequest } from 'next/server'

// export const GET = async() => {
//   const random = Math.floor( Math.random() * 11 );
//   return Response.json({ random })
// }
export const GET = async(req: NextRequest) => {
  const res = await fetch("https://httpbin.org/get", )
  const data = await res.json()

  return Response.json({ data })
}
// export const POST = async (req: NextRequest, res: NextResponse) => {
export const POST = async (req: NextRequest, res: NextResponse) => {
  const response = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify(req.body)
  })
  const data = await response.json()

  return Response.json({ data })
}
