/**
 * Alchemy API 데모 스크립트
 * ETH, USDC, BONK 토큰의 현재 가격을 조회합니다.
 */

// Alchemy API 키 (환경 변수에서 가져오기)
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"

async function getTokenPrices() {
  console.log("[v0] Alchemy API 토큰 가격 조회 시작...\n")

  try {
    const symbols = ["ETH", "USDC", "BONK"]
    const url = `https://api.g.alchemy.com/prices/v1/tokens/by-symbol?${symbols.map((s) => `symbols=${s}`).join("&")}`

    console.log("[v0] 요청 URL:", url)
    console.log("[v0] API 키:", ALCHEMY_API_KEY.substring(0, 5) + "...\n")

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ALCHEMY_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태: ${response.status}`)
    }

    const data = await response.json()

    console.log("[v0] ✅ 토큰 가격 조회 성공!\n")
    console.log("=".repeat(50))
    console.log("토큰 가격 정보:")
    console.log("=".repeat(50))
    console.log(JSON.stringify(data, null, 2))
    console.log("=".repeat(50))

    // 각 토큰별로 가격 출력
    if (data.data) {
      console.log("\n📊 요약:")
      data.data.forEach((token) => {
        console.log(`\n${token.symbol}:`)
        console.log(`  - 이름: ${token.name}`)
        console.log(`  - 가격: $${token.prices?.[0]?.value || "N/A"}`)
        console.log(`  - 네트워크: ${token.network || "N/A"}`)
      })
    }
  } catch (error) {
    console.error("[v0] ❌ 에러 발생:", error.message)
    console.error("상세 정보:", error)
  }
}

// 스크립트 실행
getTokenPrices()
