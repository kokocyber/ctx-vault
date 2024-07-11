import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function fetchCategoryData(categoryId) {
    return await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
}

async function fetchPasswordData(passwordId) {
    const password = await prisma.password.findUnique({
        where: {
            id: passwordId
        }
    })
    const categoryId = password.categoryId
    return await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
}

export async function categoryAccess(categoryId, userId) {
    try {
        const category = await fetchCategoryData(categoryId)
        switch(category.userId) {
            case userId:
                return true
            default:
                return false
        }
    } catch(e) {
        console.error(e.message)
        return false
    } finally {
        await prisma.$disconnect()
    }
}

export async function passwordAccess(passwordId, userId) {
    try {
        const category = await fetchPasswordData(passwordId)
        switch(category.userId) {
            case userId:
                return true
            default:
                return false
        }
    } catch(e) {
        console.error(e.message)
        return false
    } finally {
        await prisma.$disconnect()
    }
}