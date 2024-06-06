import { PrismaClient } from "@prisma/client";
import { getSession } from "@/middleware/auth";

const prisma = new PrismaClient();

// deletes user
async function deleteUser(userId) {
    const data = await prisma.user.delete({
        where: {
            id: userId,
        }
    })
    return data
}

// updates user
async function updateUser(userId, newEmail) {
    const data = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            email: newEmail
        }
    })
    return data;
}

// retrieves user
async function getUser(userId) {
    const data = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        }
    })
    return data
}

// DELETE request
export async function DELETE(request, { params }) {
    try {
        const userId = parseInt(params.id)
        const session = await getSession()

        if(!session) {
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            return Response.json({"Unauthorized": "Not enough permissions!"}, {status: 403})
        }
        const deletedUser = await deleteUser(userId)
        await prisma.$disconnect()
        return Response.json({"Deleted User": deletedUser}, {status: 200})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Error": e}, {status: 404})
    }
}

// PUT request
export async function PUT(request, { params }) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(params.id)
        const session = await getSession()
        const newEmail = searchParams.get("email")
        const newPassword = searchParams.get("password")

        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permissions!"}, {status: 403})
        }
        const updatedUser = await updateUser(userId, newEmail)
        await prisma.$disconnect()
        return Response.json({"Updated User": updateUser}, {status: 200})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Error": e}, {status: 404})
    }
}

// GET request
export async function GET(request, { params }) {
    try {
        const userId = parseInt(params.id)
        const session = await getSession()

        if(!session) {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
            await prisma.$disconnect()
            return Response.json({"Unauthorized": "Not enough permissions!"}, {status: 403})
        }
        const user = await getUser(userId)
        await prisma.$disconnect()
        return Response.json({"user": user}, {status: 200})

    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"Error": e}, {status: 404})
    }
}