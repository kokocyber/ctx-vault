import { getSession } from "@/middleware/auth";
import { decryptText, encryptText } from "@/middleware/encryption";
import { PrismaClient } from "@prisma/client";
import { sha512_256 } from "js-sha512";
import { withSession, withPermission } from "@/middleware/auth";

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

// retrieve password by id
async function getPassword(passwordId) {
  return await prisma.password.findFirst({
    where: {
      id: passwordId,
    }
  });
}

// retrieve all passwords of category
async function getPasswords(categoryId) {
  return await prisma.password.findMany({
    where: {
      categoryId: categoryId,
    }
  });
}

// create password for category
async function createPassword(name, username, password, categoryId) {
  return await prisma.password.create({
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
}

// delete password of category
async function deletePassword(passwordId) {
  return await prisma.password.delete({
    where: {
      id: passwordId,
    },
  });
}

// edit password of category
async function updatePassword(newPassword, newUsername, newName, passwordId) {
  return await prisma.password.update({
    where: {
      id: passwordId,
    },
    data: {
      name: newName,
      username: newUsername,
      password: newPassword,
    },
  });
}

// GET category passwords of user
export const GET = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = parseInt(searchParams.get("categoryId"))

    const data = await getPasswords(categoryId)
    console.log(data)
    return Response.json({ "passwords": data }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// POST category password of user
export const POST = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = parseInt(searchParams.get("categoryId"))

    const name = searchParams.get("name");
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    const encryptionKey = sha512_256(secretKey);
    const encryptedPassword = encryptText(password, encryptionKey);
    const encryptedUsername = encryptText(username, encryptionKey);

    const createdPassword = await createPassword(
      name,
      encryptedUsername,
      encryptedPassword,
      categoryId
    )

    return Response.json({ "Created Password": createdPassword }, { status: 201 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// DELETE password of category
export const DELETE = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const passwordId = parseInt(searchParams.get("passwordId"))

    const deletedPassword = deletePassword(passwordId)
    return Response.json({ "deleted password": deletedPassword }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// PUT password of category
export const PUT = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const passwordId = parseInt(searchParams.get("passwordId"))

    var newName = searchParams.get("name")
    var newUsername = searchParams.get("username")
    var newPassword = searchParams.get("password")

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
    return Response.json({ "updated password": updatedPassword })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))