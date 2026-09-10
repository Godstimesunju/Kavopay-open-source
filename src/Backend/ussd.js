import { callKavopay } from "./kavopay.js";

export async function payUssd(publicKey, secretKey, amount, bankCode) {
  return callKavopay(publicKey, secretKey, {
    amount,
    method: "ussd",
    bank_code: bankCode
  });
}
