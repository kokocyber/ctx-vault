import { PrismaClient } from "@prisma/client";
import { getSession, securePassword } from "@/middleware/auth";
import { nameSchema, passwordSchema } from "@/app/(util)/validator";

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
async function updateUser(userId, newPassword, newFirstName, newLastName) {
    const data = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            firstName: newFirstName,
            lastName: newLastName,
            password: newPassword
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
        console.log(params.id)
        const userId = parseInt(params.id)

        var newPassword = searchParams.get("password")
        var newFirstName = searchParams.get("firstName")
        var newLastName = searchParams.get("lastName")
        
        const session = await getSession()
        if(!session) {
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        console.log(session.user.id, userId)
        if(session.user.id !== userId && session.user.role !== "Admin") {
            return Response.json({"Unauthorized": "Not enough permissions!"}, {status: 403})
        }

        const currentUser = await getUser(userId)
        if(!newPassword) {
            newPassword = currentUser.password
        } else {
            const passwordValidation = passwordSchema.validate(newPassword, { details: true })
            if(passwordValidation.length !== 0) {
                return Response.json({ "error": "Validation failed" })
            }
            newPassword = securePassword(newPassword)
        }
        if(!newFirstName) {
            newFirstName = currentUser.firstName
        }
        if(!newLastName) {
            newLastName = currentUser.lastName
        }

        const firstNameValidation = nameSchema.validate(newFirstName, { details: true })
        const lastNameValidation = nameSchema.validate(newLastName, { details: true })

        if(
            firstNameValidation.length !== 0 ||
            lastNameValidation.length !== 0
        ) {
            return Response.json({ "error": "Validation failed" })
        }

        const updatedUser = await updateUser(userId, newPassword, newFirstName, newLastName)
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
            return Response.json({"Unauthorized": "Not logged in!"}, {status: 401})
        }
        if(session.user.id !== userId && session.user.role !== "Admin") {
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