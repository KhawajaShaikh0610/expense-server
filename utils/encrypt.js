const CryptoJS = require("crypto-js");

exports.encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.ENCRYPT_SECRET_KEY
  ).toString();
};

// Decrypt
exports.decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    process.env.ENCRYPT_SECRET_KEY
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
