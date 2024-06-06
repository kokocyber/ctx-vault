import { getSession } from "@/middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
