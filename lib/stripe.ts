import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/**
 * Lazy init so `next build` does not fail when env vars are only set at runtime (e.g. Vercel).
 * Throws when checkout/webhook runs without STRIPE_SECRET_KEY.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeInstance;
}
