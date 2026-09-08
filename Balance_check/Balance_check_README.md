# Kavopay API

Copy-paste examples for the Kavopay public API. One folder per endpoint.

## Base URL

```
https://api.kavopaywalletz.com
```

## Authentication

Every request needs two headers.

| Header | What it's for |
|---|---|
| `X-Public-Key` | Identifies you as a known API caller |
| `Authorization: Bearer` | Your secret key, authorizes access to your account's data |

Both come from the Developer tab in your Kavopay dashboard, and must belong to the same account.

Skip the `X-Public-Key` and your request isn't just rejected, your IP gets blocked from calling the API for 30 minutes. Make sure it's set before you debug anything else.

Your account needs at least Tier 1 verification to use the API. Keys on Tier 0 accounts are rejected.

## Try it

[Test your keys live](https://kavopaywalletz.com/try-it) against `/v1/balance` with real input fields, no code needed. The same page also sits in this folder as [`try-it.html`](./try-it.html) if you'd rather run it yourself.

## Endpoint

`GET /v1/balance` — returns the current wallet balance for the account that owns the key.

Response:

```json
{
  "ok": true,
  "balance": 42500.00,
  "currency": "NGN"
}
```

## Errors

| Status | Meaning |
|---|---|
| 400 | Missing or unrecognized public key. Your IP is temporarily blocked |
| 401 | Missing, invalid, or revoked secret key |
| 403 | Account below Tier 1 verification |
| 404 | Unknown endpoint |
| 405 | Wrong HTTP method for this endpoint |
| 429 | Too many requests, slow down and retry |

Every error response uses its real HTTP status code, `ok` in the body just reflects that.

## Rate limits

60 requests per minute per IP address. Requests over the limit get a 429 with a short cooldown message.
