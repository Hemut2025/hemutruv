import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "hemut_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

function getRequiredAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required for admin access.");
  }

  return password;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? getRequiredAdminPassword();
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function isValidAdminPassword(password: string) {
  const expectedPassword = getRequiredAdminPassword();
  return safeEqual(password, expectedPassword);
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}`;
  const signature = signValue(payload);

  return `${payload}.${signature}`;
}

export function isValidAdminSessionToken(token?: string | null) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = signValue(payload);

  if (!safeEqual(signature, expectedSignature)) {
    return false;
  }

  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt)) {
    return false;
  }

  return expiresAt > Date.now();
}

export function getAdminSessionMaxAge() {
  return ADMIN_SESSION_TTL_SECONDS;
}
