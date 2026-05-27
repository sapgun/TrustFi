"use server"

import crypto from "crypto"

/**
 * Alchemy Webhook 서명 검증
 * HMAC SHA-256을 사용하여 요청이 Alchemy에서 온 것인지 확인
 */
export async function isValidAlchemySignature(body: string, signature: string, signingKey: string): Promise<boolean> {
  try {
    const hmac = crypto.createHmac("sha256", signingKey)
    hmac.update(body, "utf8")
    const digest = hmac.digest("hex")
    return signature === digest
  } catch (error) {
    console.error("[v0] Signature validation error:", error)
    return false
  }
}

/**
 * Alchemy Webhook IP 주소 검증
 */
export async function isValidAlchemyIP(ip: string): Promise<boolean> {
  const allowedIPs = ["54.236.136.17", "34.237.24.169"]
  return allowedIPs.includes(ip)
}
