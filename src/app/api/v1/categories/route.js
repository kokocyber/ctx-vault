import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get categories for user
async function getAllCategories(userId) {
  const data = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  return data;
}

// creates category for user
async function createCategory(userId, categoryName) {
  const data = await prisma.category.create({
    data: {
      name: categoryName,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return data;
}

// changes category name for user
async function updateCategory(categoryId, newCategoryName) {
  const data = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: newCategoryName,
    },
  });
  return data;
}

// deletes category for user
async function deleteCategory(categoryId) {
  const data = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return data;
}

// GET all categories for user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id"));

    const session = await getSession();
    if (!session) {
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }

    const data = await getAllCategories(userId);
    await prisma.$disconnect();
    return Response.json({ categories: data }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// POST a category for user
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id"));
    const name = searchParams.get("categoryName");


    const session = await getSession();
    if (!session) {
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }

    const createdCategory = await createCategory(userId, name);
    await prisma.$disconnect();
    return Response.json(
      { "Created category": createdCategory },
      { status: 201 }
    );
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// PUT a category for user
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = parseInt(searchParams.get("categoryId"));
    const userId = parseInt(searchParams.get("id"));
    const newName = searchParams.get("name");

    const session = await getSession();
    if (!session) {
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }

    const updatedCategory = await updateCategory(categoryId, newName);
    await prisma.$disconnect();
    return Response.json({ Updated: updateCategory }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// DELETE a category for user
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get("id"));
  const categoryId = parseInt(searchParams.get("categoryId"));

  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      console.log(session.user.id, userId)
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }

    const deletedCategory = await deleteCategory(categoryId);
    await prisma.$disconnect();
    return Response.json({ Deleted: deleteCategory }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}
