import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/tokenConfig";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("rasmastoken")?.value; // گرفتن کوکی با نام rasatoken

    if (!token) {
        return Response.json({ verify: false });
    }

    const payload = await verifyAccessToken(token);

    if (!payload) {
        return Response.json({ verify: false });
    }

    return Response.json({ verify: true, payload });
}
