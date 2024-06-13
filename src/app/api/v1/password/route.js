import { decrypt, encrypt, getSession } from "@/middleware/auth";
import { decryptText, encryptText } from "@/middleware/encryption";
import { PrismaClient } from "@prisma/client";
import { sha512_256 } from "js-sha512";

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

// retrieve password by id
async function getPassword(passwordId) {
  const data = prisma.password.findFirst({
    where: {
      id: passwordId,
    },
  });
  return data;
}

// retrieve all passwords of category
async function getPasswords(categoryId) {
  const data = prisma.password.findMany({
    where: {
      categoryId: categoryId,
    },
  });
  return data;
}

// create password for category
async function createPassword(name, username, password, categoryId) {
  const data = prisma.password.create({
    data: {
      name: name,
      username: username,
      password: password,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
  return data;
}

// delete password of category
async function deletePassword(passwordId) {
  const data = prisma.password.delete({
    where: {
      id: passwordId,
    },
  });
  return data;
}

// edit password of category
async function updatePassword(newPassword, newUsername, newName, passwordId) {
  const data = prisma.password.update({
    where: {
      id: passwordId,
    },
    data: {
      name: newName,
      username: newUsername,
      password: newPassword,
    },
  });
  return data;
}

// GET category passwords of user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id"));
    const categoryId = parseInt(searchParams.get("categoryId"));

    const session = await getSession();
    if (!session) {
      await prisma.$disconnect();
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      await prisma.$disconnect();
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }
    const data = await getPasswords(categoryId);
    await prisma.$disconnect();
    return Response.json({ passwords: data }, { status: 200 });
  } catch (e) {
    prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// POST category password of user
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id"));
    const categoryId = parseInt(searchParams.get("categoryId"));

    const name = searchParams.get("name");
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    const encryptionKey = sha512_256(secretKey);
    const encryptedPassword = encryptText(password, encryptionKey);
    const encryptedUsername = encryptText(username, encryptionKey);

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
    const createdPassword = await createPassword(
      name,
      encryptedUsername,
      encryptedPassword,
      categoryId
    );
    await prisma.$disconnect();
    return Response.json(
      { "Created Password": createdPassword },
      { status: 201 }
    );
  } catch (e) {
    prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// DELETE password of category
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("id"));
    const passwordId = parseInt(searchParams.get("passwordId"));

    const session = await getSession();
    if (!session) {
      await prisma.$disconnect();
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.id !== userId && session.user.role !== "Admin") {
      await prisma.$disconnect();
      return Response.json(
        { Unauthorized: "Not enough permission!" },
        { status: 403 }
      );
    }
    const deletedPassword = deletePassword(passwordId);
    await prisma.$disconnect();
    return Response.json({ "deleted user": deletedPassword }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}

// PUT password of category
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = parseInt(searchParams.get("id"));
    const passwordId = parseInt(searchParams.get("passwordId"));

    var newName = searchParams.get("name");
    var newUsername = searchParams.get("username");
    var newPassword = searchParams.get("password");

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

    const encryptionKey = sha512_256(secretKey);
    const currentPassword = await getPassword(passwordId);
    if (!newName) {
      newName = currentPassword.name;
    }
    if (!newUsername) {
      newUsername = decryptText(currentPassword.username, encryptionKey);
    }
    if (!newPassword) {
      newPassword = decryptText(currentPassword.password, encryptionKey);
    }
    const encryptedPassword = encryptText(newPassword, encryptionKey);
    const encryptedUsername = encryptText(newUsername, encryptionKey);

    const updatedPassword = updatePassword(
      encryptedPassword,
      encryptedUsername,
      newName,
      passwordId
    );
    await prisma.$disconnect();
    return Response.json({ "deleted user": updatePassword }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 404 });
  }
}
