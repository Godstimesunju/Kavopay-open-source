import { callKavopay } from "./kavopay.js";

export async function payOpay(publicKey, secretKey, amount, redirectUrl) {
  return callKavopay(publicKey, secretKey, {
    amount,
    method: "opay",
    redirect_url: redirectUrl
  });
}
