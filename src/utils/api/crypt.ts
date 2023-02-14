const crypto = require("crypto");

// TODO: ENV化する
const ENCRYPTION_KEY = "LiwHrTB9kuK8Up2BzmbjAxKWTzrJ9bhZ"; // 32Byte.
const BUFFER_KEY = "FbXUizSnyCkeqw56"; // 16Byte.
const ENCRYPT_METHOD = "aes-256-cbc"; // 暗号化方式
const ENCODING = "hex"; // 暗号化時のencoding

const raw = JSON.stringify({ userId: 1 }); // 暗号化する対象。stringなら何でも。

export const getEncryptedString = (raw: string) => {
  let iv = Buffer.from(BUFFER_KEY);
  let cipher = crypto.createCipheriv(
    ENCRYPT_METHOD,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(raw);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString(ENCODING);
};

export const getDecryptedString = (encrypted: string) => {
  let iv = Buffer.from(BUFFER_KEY);
  let encryptedText = Buffer.from(encrypted, ENCODING);
  let decipher = crypto.createDecipheriv(
    ENCRYPT_METHOD,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
