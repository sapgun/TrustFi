import { createConfig } from "@privy-io/wagmi"
import { http } from "wagmi"
import { mainnet, polygon, avalanche, arbitrum, base } from "wagmi/chains"

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, avalanche, arbitrum, base],
  transports: {
    [mainnet.id]: http("https://eth.llamarpc.com"),
    [polygon.id]: http("https://polygon-rpc.com"),
    [avalanche.id]: http("https://api.avax.network/ext/bc/C/rpc"),
    [arbitrum.id]: http("https://arb1.arbitrum.io/rpc"),
    [base.id]: http("https://mainnet.base.org"),
  },
})
