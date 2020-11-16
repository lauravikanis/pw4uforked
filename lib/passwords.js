const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const passwordDoc = await collection("passwords").findOne({
    name: passwordName,
  });
  if (!passwordDoc) {
    throw new Error(`Password ${passwordName} not found`);
  }

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordDoc.value,
    await readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
