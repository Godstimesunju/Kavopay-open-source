const BASE = "https://api.kavopaywalletz.com";

export async function callKavopay(publicKey, secretKey, body) {
  const res = await fetch(`${BASE}/v1/payments`, {
    method: "POST",
    headers: {
      "X-Public-Key": publicKey,
      "Authorization": "Bearer " + secretKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

export async function verifyKavopay(publicKey, secretKey, reference) {
  const res = await fetch(`${BASE}/v1/payments/${encodeURIComponent(reference)}`, {
    headers: {
      "X-Public-Key": publicKey,
      "Authorization": "Bearer " + secretKey
    }
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}
