import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("rasmastoken")?.value;

    if (token) {
      const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
      if (payload) {
        return NextResponse.json(
          {
            success: true,
            message: "عملیات موفق",
            data: {
              ...payload,
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "توکن معتبر نیست",
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "توکن موجود نیست",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطایی رخ داده است دوباره تلاش کنید",
      },
      { status: 500 }
    );
  }
}
