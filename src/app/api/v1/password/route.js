import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// retrieve all passwords of category
async function getPasswords(categoryId) {
    const data = prisma.password.findMany({
        where: {
            categoryId: categoryId
        }
    })
    return data
}

// create password for category
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

// delete password of category
async function deletePassword(passwordId) {
    const data = prisma.password.delete({
        where: {
            id: passwordId
        }
    })
    return data
}

// edit password of category
async function updatePassword(newPassword, passwordId) {
    const data = prisma.password.update({
        where: {
           id:  passwordId 
        },
        data: {
            password: newPassword
        }
    })
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
        const createdPassword = await createPassword(password, categoryId)
        await prisma.$disconnect()
        return Response.json({"passwords": createdPassword}, {status: 201})

    } catch(e) {
        prisma.$disconnect()
        return Response.json({"error": e}, {status: 404})

    }
}

// DELETE password of category
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))
        const passwordId = parseInt(searchParams.get("passwordId"))

        const session = await getSession()
        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permission!"}, {status: 403})
        }
        const deletedPassword = deletePassword(passwordId)
        await prisma.$disconnect()
        return Response.json({"deleted user": deletedPassword}, {status: 200})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"error": e}, {status: 404})

    }
    
}

// PUT password of category
export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))
        const passwordId = parseInt(searchParams.get("passwordId"))
        const newPassword = searchParams.get("password")

        const session = await getSession()
        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permission!"}, {status: 403})
        }
        const updatedPassword = updatePassword(newPassword, passwordId)
        await prisma.$disconnect()
        return Response.json({"deleted user": updatePassword}, {status: 200})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"error": e}, {status: 404})

    }
    
}