import { createHash } from "crypto";

/**
 * Creates a SHA-256 hash of the input string
 */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * Generates a stable offer ID from key fields
 */
export function generateOfferId(fields: {
  bank_id: string;
  product_type: string;
  currency_index: string;
  segment: string;
  channel: string;
  rate_from: number;
}): string {
  const key = [
    fields.bank_id,
    fields.product_type,
    fields.currency_index,
    fields.segment,
    fields.channel,
    fields.rate_from.toString(),
  ].join("|");

  return sha256(key).substring(0, 16);
}
