import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prismaConfig";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // بررسی یکتا بودن نام کاربری
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "نام کاربری تکراری است" },
        { status: 400 }
      );
    }

    // بررسی یکتا بودن ایمیل
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "ایمیل تکراری است" },
        { status: 400 }
      );
    }

    // هش کردن رمز
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر جدید
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "ثبت ‌نام با موفقیت انجام شد",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { success: false, message: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
