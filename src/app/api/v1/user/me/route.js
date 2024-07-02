import { withSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// retrieve user data
async function getUserData(userId) {
    return await prisma.category.findMany({
        where: {
            userId: userId
        },
        include: {
            passwords: true
        }
    })
}

export const GET = withSession(async (_, session) => {
    try {
        const userData = await getUserData(session.user.id)
        return Response.json({ "id": session, "user data": userData })
    } catch(e) {
        return Response.json({ "error": e.message }, { status: 404 })
    } finally {
        await prisma.$disconnect()
    }
})
