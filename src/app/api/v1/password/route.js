import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// retrieve all passwords of categoryId
async function getPasswords(categoryId) {
    const data = prisma.password.findMany({
        where: {
            categoryId: categoryId
        }
    })
    return data
}

// create password of categoryId
async function createPassword(password, categoryId) {
    const data = prisma.password.create({
        data: {
            password: password,
            category: {
                connect: {
                    id: categoryId
                }
            }
        }
    })
    return data
}

// GET category passwords of user
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))
        const categoryId = parseInt(searchParams.get("categoryId"))

        const session = await getSession()
        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permission!"}, {status: 403})
        }
        const data = await getPasswords(categoryId)
        await prisma.$disconnect()
        return Response.json({"passwords": data}, {status: 200})

    } catch(e) {
        prisma.$disconnect()
        return Response.json({"error": e}, {status: 404})
    }
}

// POST category password of user
export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))
        const categoryId = parseInt(searchParams.get("categoryId"))
        const password = searchParams.get("password")

        // TODO: Encrypt password
        const encryptedPassword = password

        const session = await getSession()
        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permission!"}, {status: 403})
        }
        const data = await createPassword(password, categoryId)
        await prisma.$disconnect()
        return Response.json({"passwords": data}, {status: 200})

    } catch(e) {
        prisma.$disconnect()
        return Response.json({"error": e}, {status: 404})

    }
}