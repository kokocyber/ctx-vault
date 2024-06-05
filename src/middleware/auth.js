import { jwtVerify, SignJWT } from "jose";
import { sha512 } from "js-sha512";

const secretKey = process.env.SECRET_KEY

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15 minutes")
        .sign(secretKey)
}

export async function decrypt(token) {
    const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"]
    })
    return payload
}

export function securePassword(password) {
    const hashedPassword = sha512(password)
    const hashedKey = sha512(secretKey)

    const superSecure = sha512(hashedPassword + hashedKey)

    return hashedPassword + superSecure + hashedKey
}