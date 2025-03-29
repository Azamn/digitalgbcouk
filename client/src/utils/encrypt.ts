import CryptoJS from "crypto-js";
export const EncryptData = (data: any) => {
  const stringData = JSON.stringify(data);
  const ciphertext = CryptoJS.AES.encrypt(
    stringData,
    process.env.NEXT_PUBLIC_ENCRYPTION_kEY as string,
  ).toString();
  return ciphertext;
};