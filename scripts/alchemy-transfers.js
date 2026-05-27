/**
 * Alchemy Transfers API Demo
 *
 * 특정 주소의 거래 내역을 조회합니다.
 * Trust Score 계산에 사용할 수 있는 거래 패턴 분석 데이터를 제공합니다.
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// 테스트할 주소 (Vitalik Buterin의 주소)
const TEST_ADDRESS = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1"

/**
 * 특정 주소로 들어온 거래 내역 조회
 */
async function getIncomingTransfers(address, category = "external", maxCount = 10) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          toAddress: address,
          withMetadata: true,
          excludeZeroValue: true,
          maxCount: `0x${maxCount.toString(16)}`,
          category: [category],
        },
      ],
    }),
  })

  const data = await response.json()
  return data.result
}

/**
 * 특정 주소에서 나간 거래 내역 조회
 */
async function getOutgoingTransfers(address, category = "external", maxCount = 10) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: address,
          withMetadata: true,
          excludeZeroValue: true,
          maxCount: `0x${maxCount.toString(16)}`,
          category: [category],
        },
      ],
    }),
  })

  const data = await response.json()
  return data.result
}

/**
 * 거래 내역 포맷팅
 */
function formatTransfer(transfer) {
  return {
    hash: transfer.hash,
    from: transfer.from,
    to: transfer.to,
    value: transfer.value,
    asset: transfer.asset || "ETH",
    category: transfer.category,
    blockNum: transfer.blockNum,
    metadata: {
      blockTimestamp: transfer.metadata?.blockTimestamp,
    },
  }
}

/**
 * Trust Score 계산을 위한 거래 분석
 */
function analyzeTransfers(incoming, outgoing) {
  const totalIncoming = incoming.transfers.length
  const totalOutgoing = outgoing.transfers.length

  // 거래 빈도 분석
  const transactionFrequency = totalIncoming + totalOutgoing

  // 수신/발신 비율
  const receiveToSendRatio = totalOutgoing > 0 ? (totalIncoming / totalOutgoing).toFixed(2) : totalIncoming

  return {
    totalIncoming,
    totalOutgoing,
    transactionFrequency,
    receiveToSendRatio,
    trustScoreContribution: Math.min(transactionFrequency * 2, 100), // 최대 100점
  }
}

// 메인 실행
async function main() {
  console.log("🔍 Alchemy Transfers API 데모\n")
  console.log(`주소: ${TEST_ADDRESS}\n`)

  try {
    // 1. 들어온 거래 조회 (External)
    console.log("📥 들어온 거래 (최근 5개):")
    const incoming = await getIncomingTransfers(TEST_ADDRESS, "external", 5)

    if (incoming.transfers && incoming.transfers.length > 0) {
      incoming.transfers.forEach((transfer, index) => {
        const formatted = formatTransfer(transfer)
        console.log(`\n${index + 1}. ${formatted.asset} 수신`)
        console.log(`   From: ${formatted.from}`)
        console.log(`   Value: ${formatted.value}`)
        console.log(`   Block: ${formatted.blockNum}`)
        console.log(`   Hash: ${formatted.hash}`)
      })
    } else {
      console.log("   거래 내역 없음")
    }

    // 2. 나간 거래 조회 (External)
    console.log("\n\n📤 나간 거래 (최근 5개):")
    const outgoing = await getOutgoingTransfers(TEST_ADDRESS, "external", 5)

    if (outgoing.transfers && outgoing.transfers.length > 0) {
      outgoing.transfers.forEach((transfer, index) => {
        const formatted = formatTransfer(transfer)
        console.log(`\n${index + 1}. ${formatted.asset} 전송`)
        console.log(`   To: ${formatted.to}`)
        console.log(`   Value: ${formatted.value}`)
        console.log(`   Block: ${formatted.blockNum}`)
        console.log(`   Hash: ${formatted.hash}`)
      })
    } else {
      console.log("   거래 내역 없음")
    }

    // 3. Trust Score 분석
    console.log("\n\n📊 Trust Score 분석:")
    const analysis = analyzeTransfers(incoming, outgoing)
    console.log(`   총 수신 거래: ${analysis.totalIncoming}`)
    console.log(`   총 발신 거래: ${analysis.totalOutgoing}`)
    console.log(`   거래 빈도: ${analysis.transactionFrequency}`)
    console.log(`   수신/발신 비율: ${analysis.receiveToSendRatio}`)
    console.log(`   Trust Score 기여도: +${analysis.trustScoreContribution}점`)

    // 4. ERC20 토큰 전송 조회
    console.log("\n\n🪙 ERC20 토큰 전송 (최근 3개):")
    const erc20Transfers = await getIncomingTransfers(TEST_ADDRESS, "erc20", 3)

    if (erc20Transfers.transfers && erc20Transfers.transfers.length > 0) {
      erc20Transfers.transfers.forEach((transfer, index) => {
        const formatted = formatTransfer(transfer)
        console.log(`\n${index + 1}. ${formatted.asset} 수신`)
        console.log(`   From: ${formatted.from}`)
        console.log(`   Value: ${formatted.value}`)
        console.log(`   Hash: ${formatted.hash}`)
      })
    } else {
      console.log("   ERC20 토큰 전송 내역 없음")
    }
  } catch (error) {
    console.error("❌ 에러 발생:", error.message)
  }
}

main()
