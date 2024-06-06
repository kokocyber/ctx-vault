import { jwtVerify, SignJWT } from "jose";
import { sha512 } from "js-sha512";
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

        const superSecure = sha512(hashedPassword + hashedKey)
        return hashedPassword + superSecure + hashedKey
    } catch(e) {
        return e
    }

}
