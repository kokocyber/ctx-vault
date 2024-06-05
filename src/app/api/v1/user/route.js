import { securePassword } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// retrieves all users
async function getAllUsers() {
    const data = await prisma.user.findMany();
    
    if(data.length === 0) {
        data.push("no users")
    }
    return data;
}

// adds user
async function addUser(email, password) {
    const user = await prisma.user.create({
        data: {
            email: email,
            password: password 
        }
    })
    return user;
}

// GET request
export async function GET(request) {
    try {
        const data = await getAllUsers()
        await prisma.$disconnect()
        return Response.json({"users": data}, {status: 200})
            	
    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"error": e}, {status: 400})
    }
}

// POST request
export async function POST(request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    const hashedPassword = securePassword(password)

    try {
        const user = await addUser(email, hashedPassword)
        await prisma.$disconnect()
        return Response.json({"user created": user}, {status: 201})
    } catch(e) {
        await prisma.$disconnect()
        return Response.json({"error": e}, {status: 400})
    }
}