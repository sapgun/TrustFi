// Alchemy Token API Demo - Get ERC20 Token Balances
// This script fetches all ERC20 token balances for a given Ethereum address

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_ENDPOINT = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// Example address (Vitalik's address)
const TEST_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

async function getTokenBalances(address) {
  console.log("[v0] Fetching token balances for:", address)

  try {
    const response = await fetch(ALCHEMY_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [address, "erc20"],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`Alchemy API error: ${data.error.message}`)
    }

    console.log("\n✅ Token Balances Retrieved Successfully\n")
    console.log("Address:", data.result.address)
    console.log("Total tokens found:", data.result.tokenBalances.length)
    console.log("\n--- Token Balances ---\n")

    // Filter out tokens with zero balance and display
    const nonZeroBalances = data.result.tokenBalances.filter(
      (token) => token.tokenBalance !== "0x0000000000000000000000000000000000000000000000000000000000000000",
    )

    console.log(`Tokens with non-zero balance: ${nonZeroBalances.length}\n`)

    nonZeroBalances.forEach((token, index) => {
      const balance = BigInt(token.tokenBalance)
      console.log(`${index + 1}. Contract Address: ${token.contractAddress}`)
      console.log(`   Balance (raw): ${balance.toString()}`)
      console.log(`   Balance (hex): ${token.tokenBalance}\n`)
    })

    // Show first 5 tokens with zero balance as example
    const zeroBalances = data.result.tokenBalances.filter(
      (token) => token.tokenBalance === "0x0000000000000000000000000000000000000000000000000000000000000000",
    )

    if (zeroBalances.length > 0) {
      console.log(`\nTokens with zero balance: ${zeroBalances.length} (showing first 5)`)
      zeroBalances.slice(0, 5).forEach((token, index) => {
        console.log(`${index + 1}. ${token.contractAddress}`)
      })
    }

    return data.result
  } catch (error) {
    console.error("❌ Error fetching token balances:", error.message)
    throw error
  }
}

// Run the demo
getTokenBalances(TEST_ADDRESS)
  .then(() => {
    console.log("\n✅ Demo completed successfully")
  })
  .catch((error) => {
    console.error("\n❌ Demo failed:", error)
    process.exit(1)
  })
