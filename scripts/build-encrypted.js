import CryptoJS from "crypto-js";
import fs from "fs-extra";
import misterios from "../src/data/misterios-master.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CRYPTO_KEY } from "../src/config/security.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFile = path.resolve(
  __dirname,
  "../src/data/misterios-encrypted.js",
);

const encrypted = {};

for (const [codigo, dados] of Object.entries(misterios)) {
  encrypted[codigo] = CryptoJS.AES.encrypt(
    JSON.stringify(dados),
    CRYPTO_KEY,
  ).toString();
}

const conteudo = `export default ${JSON.stringify(encrypted, null, 2)};`;

await fs.outputFile(outputFile, conteudo);

console.log("Arquivo gerado com sucesso.");
