import { getSession, withPermission, withSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get categories for user
async function getAllCategories(userId) {
  return await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
}

// creates category for user
async function createCategory(userId, categoryName) {
  return await prisma.category.create({
    data: {
      name: categoryName,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

// changes category name for user
async function updateCategory(categoryId, newCategoryName) {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: newCategoryName,
    },
  });
}

// deletes category for user
async function deleteCategory(categoryId) {
  await prisma.password.deleteMany({
    where: {
      categoryId: categoryId,
    },
  });

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
}

// GET all categories of user
export const GET = withSession(withPermission(async (request, session) => {
  try {
    const data = await getAllCategories(session.user.id)
    return Response.json({ "categories": data }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// POST a category for user
export const POST = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("categoryName")

    const createdCategory = await createCategory(session.user.id, name)
    return Response.json({ "Created category": createdCategory }, { status: 201 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// PUT a category for user
export const PUT = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = parseInt(searchParams.get("categoryId"))
    const newName = searchParams.get("name")

    const updatedCategory = await updateCategory(categoryId, newName)
    return Response.json({ "Updated": updatedCategory }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// DELETE a category for user
export const DELETE = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = parseInt(searchParams.get("categoryId"))

    const deletedCategory = await deleteCategory(categoryId)
    return Response.json({ "Deleted": deletedCategory }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))
