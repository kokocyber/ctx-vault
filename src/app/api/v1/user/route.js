import { getSession, securePassword, withPermission, withSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";
import * as EmailValidator from "email-validator";
import { passwordSchema, nameSchema } from "@/app/(util)/validator";

const prisma = new PrismaClient();

// retrieves all users
async function getAllUsers() {
  return await prisma.user.findMany();
}

// adds user
async function addUser(email, password, firstName, lastName) {
  return await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });
}

export const GET = withSession(withPermission(async (request, session) => {
  try {
    const users = await getAllUsers()
    return Response.json({ "users": users }, { status: 200 })
  } catch(e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))

// POST request
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const passwordValidation = passwordSchema.validate(password, {
    details: true,
  });
  const firstNameValidation = nameSchema.validate(firstName, { details: true });
  const lastNameValidation = nameSchema.validate(lastName, { details: true });
  const emailValidation = EmailValidator.validate(email);

  if (
    !emailValidation ||
    lastNameValidation.length !== 0 ||
    firstNameValidation.length !== 0 ||
    passwordValidation.length !== 0
  ) {
    return Response.json({ "error": "Validation failed" });
  }

  const hashedPassword = securePassword(password);

  try {
    const user = await addUser(email, hashedPassword, firstName, lastName);
    await prisma.$disconnect();
    return Response.json(
      { "user created": user, status: 201 },
      { status: 201 }
    );
  } catch (e) {
    return Response.json({ error: e.message, status: 400 }, { status: 400 });
  } finally {
    await prisma.$disconnect()
  }
}