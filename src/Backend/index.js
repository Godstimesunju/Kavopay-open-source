import { payCard } from "./card.js";
import { payOpay } from "./opay.js";
import { payUssd } from "./ussd.js";
import { payBankTransfer } from "./banktransfer.js";
import { verifyKavopay } from "./kavopay.js";

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function json(payload, status) {
  return new Response(JSON.stringify(payload), { status: status || 200, headers: CORS });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (url.pathname === "/pay" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { publicKey, secretKey, method, amount, redirect_url, bank_code } = body;

      if (!publicKey || !secretKey) return json({ ok: false, message: "publicKey and secretKey are required." }, 400);
      if (!amount || !method)       return json({ ok: false, message: "amount and method are required." }, 400);

      let result;
      if (method === "card")          result = await payCard(publicKey, secretKey, amount, redirect_url);
      else if (method === "opay")     result = await payOpay(publicKey, secretKey, amount, redirect_url);
      else if (method === "ussd")     result = await payUssd(publicKey, secretKey, amount, bank_code);
      else if (method === "bank_transfer") result = await payBankTransfer(publicKey, secretKey, amount);
      else return json({ ok: false, message: "method must be card, opay, ussd, or bank_transfer." }, 400);

      return json(result.data, result.status);
    }

    if (url.pathname === "/verify" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { publicKey, secretKey, reference } = body;

      if (!publicKey || !secretKey) return json({ ok: false, message: "publicKey and secretKey are required." }, 400);
      if (!reference)               return json({ ok: false, message: "reference is required." }, 400);

      const result = await verifyKavopay(publicKey, secretKey, reference);
      return json(result.data, result.status);
    }

    return json({ ok: false, message: "Unknown endpoint. Use POST /pay or POST /verify." }, 404);
  }
};
