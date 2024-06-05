import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const session = await getSession()
        if(session) {
            console.log(session)
        }
        return Response.json({"Ok": "ok"})
    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Unauthorized": e}, {status: 401})
    }
}