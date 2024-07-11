import crypto from "crypto";

export function encryptText(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decryptText(encryptedText, key) {
  if (encryptedText) {
    const textParts = encryptedText.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key, "hex"),
      iv
    );
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } else {
    console.error("Couldnt decrypt text");
  }
}
