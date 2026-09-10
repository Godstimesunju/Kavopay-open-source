import { callKavopay } from "./kavopay.js";

export async function payBankTransfer(publicKey, secretKey, amount) {
  return callKavopay(publicKey, secretKey, {
    amount,
    method: "bank_transfer"
  });
}
