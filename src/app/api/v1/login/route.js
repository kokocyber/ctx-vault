import { encrypt, getSession, securePassword } from "@/middleware/auth"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"

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

        const inputPassword = securePassword(password)
        if(inputPassword === user.password) {
            const expiration = new Date(Date.now() + 3600 * 1000)

            const oldSession = await getSession()
            if(oldSession) {
                cookies().set("session", "", { expires: new Date(0) })
            }

            const session = await encrypt({ user, expiration })
            cookies().set("session", session, { expires: expiration })

            return Response.json({"data": {"session": cookies().get("session"), "user": user}}, {status: 200})


        } else {
            return Response.json({"data": "wrong password"}, {status: 401})
        }

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Error": e}, {status: 404})
    }

}