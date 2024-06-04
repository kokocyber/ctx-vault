import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getUserByEmail(email) {
    const data = await prisma.user.findUniqueOrThrow({
        where: {
            email: email,
        }
    })
    return data
}


export async function POST(request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    try {
        const user = await getUserByEmail(email)
        await prisma.$disconnect()
        return Response.json({"data": user}, {status: 200})
    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Error": e}, {status: 401})
    }

}