import { type NextRequest, NextResponse } from "next/server"
import { isValidAlchemySignature } from "@/lib/alchemy/webhook-signature"
import { processWebhookEvent } from "@/lib/alchemy/webhook-handler"
import type { AlchemyWebhookEvent } from "@/lib/alchemy/webhook-types"

/**
 * Alchemy Webhook 엔드포인트
 * POST /api/webhooks/alchemy
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문 읽기 (raw string으로)
    const body = await request.text()

    // 2. 서명 검증
    const signature = request.headers.get("x-alchemy-signature")
    const signingKey = process.env.ALCHEMY_WEBHOOK_SIGNING_KEY

    if (!signature) {
      console.error("[v0] Missing x-alchemy-signature header")
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    if (!signingKey) {
      console.error("[v0] Missing ALCHEMY_WEBHOOK_SIGNING_KEY env var")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const isValid = await isValidAlchemySignature(body, signature, signingKey)
    if (!isValid) {
      console.error("[v0] Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    // 3. JSON 파싱
    const webhookEvent: AlchemyWebhookEvent = JSON.parse(body)
    console.log("[v0] Received webhook event:", webhookEvent.id)

    // 4. 이벤트 처리
    const result = await processWebhookEvent(webhookEvent)

    // 5. 응답 (200 OK 필수)
    return NextResponse.json({
      success: result.success,
      message: result.message,
      eventId: webhookEvent.id,
    })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

/**
 * GET 요청 처리 (헬스 체크)
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Alchemy Webhook endpoint is ready",
  })
}
