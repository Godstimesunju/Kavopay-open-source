import { callKavopay } from "./kavopay.js";

export async function payCard(publicKey, secretKey, amount, redirectUrl) {
  return callKavopay(publicKey, secretKey, {
    amount,
    method: "card",
    redirect_url: redirectUrl
  });
}
