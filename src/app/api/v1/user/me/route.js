import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";
import { useDebugValue } from "react";

const prisma = new PrismaClient()

// retrieve user data
async function getUserData(userId) {
    const data = await prisma.category.findMany({
        where: {
            userId: userId
        },
        include: {
            passwords: true
        }
    })
    return data
}

export async function GET() {
    try {
        const session = await getSession()
        if(!session) {
            return Response.json({"Unauthorized": "You are not logged in."}, { status: 403 })
        }

        const userData = await getUserData(session.user.id)
        return Response.json({"id": session, "user data": userData})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Unauthorized": e}, {status: 401})
    }
}