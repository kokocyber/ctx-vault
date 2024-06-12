import { getSession, securePassword, validateSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";
import * as EmailValidator from "email-validator";

const prisma = new PrismaClient();

// retrieves all users
async function getAllUsers() {
  const data = await prisma.user.findMany();

  if (data.length === 0) {
    data.push("no users");
  }
  return data;
}

// adds user
async function addUser(email, password, firstName, lastName) {
  const user = await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });
  return user;
}

// GET request
export async function GET(request) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ Unauthorized: "Not logged in!" }, { status: 401 });
    }
    if (session.user.role !== "Admin") {
      return Response.json(
        { Unauthorized: "Not enough permissions!" },
        { status: 403 }
      );
    }

    const data = await getAllUsers();
    await prisma.$disconnect();
    return Response.json({ users: data }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    return Response.json({ error: e }, { status: 400 });
  }
}

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
    return Response.json({ error: "Validation failed" });
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
    await prisma.$disconnect();
    return Response.json({ error: e, status: 400 }, { status: 400 });
  }
}
