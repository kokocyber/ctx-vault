import { getSession } from "@/middleware/auth"
import { cookies } from "next/headers";

export async function GET() {
    try {
        const session = await getSession()
        if(!session) return Response.json({"Error": "how do you wanna log out if you are not even logged in?????"}, {status: 404});
        cookies().set("session", "", { expires: new Date(0) })
    } catch(e) {
        return Response.json({"Error": e}, {status: 404})
    }
}