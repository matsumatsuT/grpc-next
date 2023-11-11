import type { NextApiResponse } from "next";
import { NextResponse, NextRequest } from 'next/server'
import { credentials, ServiceError } from "@grpc/grpc-js";

import { UserManagerClient } from "../../../../codegen/protos/user_grpc_pb";
import { UserRequest, UserResponse } from "../../../../codegen/protos/user_pb";

const Request = new UserRequest();
const Client = new UserManagerClient(
  "localhost:50051",
  credentials.createInsecure()
);

export type UserApiResponse =
  | { ok: true; user: UserResponse.AsObject["user"] }
  | { ok: false; error: ServiceError };


  //　うまいことreturnすれば動きそう
export const POST = async (
  apiReq: NextRequest,
  apiRes: NextResponse<UserApiResponse>
) => {
  const body = await apiReq.json()
  console.log("body", body)
  const id = await JSON.parse(body.id);
  console.log(id)
  Request.setId((id))
  const res =  Client.get(Request, (grpcErr, grpcRes) => {
    if (grpcErr) {
      console.log("エラー")
      apiRes.status(500).json({ ok: false, error: grpcErr });
    } else {
      console.log("成功")
      const { user } = grpcRes.toObject();
      console.log(user)
      return NextResponse.json({ok: true, user})
    }
  });
  // return NextResponse.json({ok: true, res}, {status: 200})
}