const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const passwordDoc = await collection("passwords").findOne({
    name: passwordName,
  });
  if (!passwordDoc) {
    return null;
  }

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordDoc.value,
    readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    readMasterPassword()
  ).toString();

  await collection("passwords").updateOne(
    {
      name: passwordName,
    },
    {
      $set: {
        value: encryptedValue,
      },
    },
    {
      upsert: true,
    }
  );
}

async function deletePassword(passwordName) {
  return await collection("passwords").deleteOne({
    name: passwordName,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;
