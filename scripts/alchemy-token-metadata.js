// Alchemy Token API Demo - Get Token Metadata
// This script fetches metadata for specific ERC20 tokens

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_ENDPOINT = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// Example token addresses
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

async function getTokenMetadata(contractAddress) {
  console.log("[v0] Fetching metadata for token:", contractAddress)

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
        method: "alchemy_getTokenMetadata",
        params: [contractAddress],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`Alchemy API error: ${data.error.message}`)
    }

    const metadata = data.result
    console.log("\n--- Token Metadata ---")
    console.log("Name:", metadata.name)
    console.log("Symbol:", metadata.symbol)
    console.log("Decimals:", metadata.decimals)
    console.log("Logo:", metadata.logo || "N/A")
    console.log("")

    return metadata
  } catch (error) {
    console.error("❌ Error fetching token metadata:", error.message)
    throw error
  }
}

// Run the demo for multiple tokens
async function runDemo() {
  console.log("🔍 Fetching metadata for popular stablecoins...\n")

  try {
    await getTokenMetadata(USDC_ADDRESS)
    await getTokenMetadata(USDT_ADDRESS)
    await getTokenMetadata(DAI_ADDRESS)

    console.log("✅ All token metadata fetched successfully")
  } catch (error) {
    console.error("❌ Demo failed:", error)
    process.exit(1)
  }
}

runDemo()
