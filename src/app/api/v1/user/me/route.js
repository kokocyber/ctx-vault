import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const session = await getSession()
        if(session) {
            return Response.json({"Authorized": session})
        }
    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Unauthorized": e}, {status: 401})
    }
}