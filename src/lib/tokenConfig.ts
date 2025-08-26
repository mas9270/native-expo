import { jwtVerify, SignJWT } from "jose";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!
);

export async function generateAccessToken(userInfo: {
  id: number;
  username: string;
  email: string;
  role: string;
}) {
  return await new SignJWT({ ...userInfo })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // یک ساعت
    .sign(ACCESS_TOKEN_SECRET);
}

export async function verifyAccessToken(token?: string) {
  try {
    if (token) {
      const { payload } = await jwtVerify(
        token ? token : "",
        ACCESS_TOKEN_SECRET
      );
      return payload;
    }
    return false;
  } catch (err) {
    console.log("JWT verification error:", err);
    return false; // توکن نامعتبر یا منقضی شده
  }
}
