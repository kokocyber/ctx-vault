import { jwtVerify, SignJWT } from "jose";

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
