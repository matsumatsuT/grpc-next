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

export const POST = (
  apiReq: NextRequest,
  apiRes: NextApiResponse<UserApiResponse>,
) => {
  console.log("リクエストボディー", apiReq.body)
  console.log("JSON.stringify", JSON.stringify(apiReq.body))
  const id = JSON.stringify(apiReq.body);
  Request.setId(Number(id))
  Client.get(Request, (grpcErr, grpcRes) => {
    if (grpcErr) {
      console.log("エラー")
      return apiRes.status(500).json({ ok: false, error: grpcErr });
    } else {
      console.log("成功")
      const { user } = grpcRes.toObject();
      return apiRes.status(200).json({ ok: true, user });
    }
  });
}