import { jwtVerify, SignJWT } from "jose";
import { sha512, sha512_256 } from "js-sha512";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY

const jwtKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    try {
        const session = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1 hour")
            .sign(jwtKey)
        return session
    } catch(e) {
        return e
    }
}

export async function decrypt(token) {
    const { payload } = await jwtVerify(token, jwtKey, {
        algorithms: ["HS256"]
    })
    return payload
}

export async function getSession() {
    const session = cookies().get("session")?.value
    if(!session) return null
    return await decrypt(session)
}

export function securePassword(password) {
    try {
        const hashedPassword = sha512(password)
        const hashedKey = sha512(secretKey)

        const superSecure = sha512_256(hashedPassword + hashedKey)
        return superSecure
    } catch(e) {
        return e
    }
}

export function withSession(handler) {
    return async function(request) {
        const session = await getSession()
        if(!session) {
            return Response.json({ "Unauthorized": "Not logged in"}, { status: 401 })
        }
        return handler(request, session)
    }
}

export function withPermission(handler) {
    return async function(request, session) {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))

        if(session.user.id !== userId && session.user.role !== "Admin") {
            return Response.json({ "Unauthorized": "Not enough permission" }, { status: 403 })
        }
        return handler(request, session)
    }
}