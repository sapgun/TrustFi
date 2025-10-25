"use client"

import { useWallets, usePrivy } from "@privy-io/react-auth"
import { useBalance } from "wagmi"
import { mainnet, polygon, avalanche, arbitrum, base } from "wagmi/chains"
import { motion } from "framer-motion"

const SUPPORTED_CHAINS = [
  {
    chain: mainnet,
    icon: "⟠",
    name: "Ethereum",
    color: "from-blue-400 to-blue-600",
  },
  {
    chain: polygon,
    icon: "⬣",
    name: "Polygon",
    color: "from-purple-400 to-purple-600",
  },
  {
    chain: avalanche,
    icon: "🔺",
    name: "Avalanche",
    color: "from-red-400 to-red-600",
  },
  {
    chain: arbitrum,
    icon: "🔷",
    name: "Arbitrum",
    color: "from-blue-300 to-blue-500",
  },
  {
    chain: base,
    icon: "🔵",
    name: "Base",
    color: "from-blue-500 to-indigo-600",
  },
]

export default function MultiChainBalance() {
  const { ready } = usePrivy()
  const { wallets } = useWallets()

  if (!ready) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center">
        <div className="text-teal-400 animate-pulse">로딩 중...</div>
      </div>
    )
  }

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy")

  if (!embeddedWallet) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center border border-slate-700">
        <div className="text-6xl mb-4">👛</div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">지갑을 연결하세요</h3>
        <p className="text-slate-400">멀티체인 잔액을 확인하려면 먼저 지갑을 연결해야 합니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">멀티체인 자산</h2>
        <p className="text-teal-100">모든 체인의 자산을 한눈에 확인하세요</p>
        <div className="mt-4 font-mono text-sm bg-white/20 px-4 py-2 rounded-lg inline-block">
          {embeddedWallet.address.slice(0, 6)}...{embeddedWallet.address.slice(-4)}
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUPPORTED_CHAINS.map((item, idx) => (
          <ChainBalanceCard
            key={idx}
            address={embeddedWallet.address as `0x${string}`}
            chain={item.chain}
            icon={item.icon}
            name={item.name}
            color={item.color}
          />
        ))}
      </div>

      {/* Total Value (Mock for demo) */}
      <div className="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-slate-100 mb-4">총 자산 가치 (USD)</h3>
        <div className="text-4xl font-bold text-slate-100">$0.00</div>
        <p className="text-sm text-slate-400 mt-2">실시간 환율 기준 계산</p>
      </div>
    </div>
  )
}

function ChainBalanceCard({
  address,
  chain,
  icon,
  name,
  color,
}: {
  address: `0x${string}`
  chain: any
  icon: string
  name: string
  color: string
}) {
  const { data, isLoading, isError } = useBalance({
    address,
    chainId: chain.id,
    query: {
      enabled: !!address,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800 rounded-xl shadow-md p-6 border-2 border-slate-700 hover:border-teal-500 transition-all"
    >
      {/* Chain Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-2xl`}
          >
            {icon}
          </div>
          <div>
            <div className="font-bold text-slate-100">{name}</div>
            <div className="text-xs text-slate-400">Chain ID: {chain.id}</div>
          </div>
        </div>
      </div>

      {/* Balance */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-slate-400">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500" />
          <span className="text-sm">로딩 중...</span>
        </div>
      ) : isError ? (
        <div className="text-red-400 text-sm">⚠️ 조회 실패</div>
      ) : (
        <div>
          <div className="text-3xl font-bold text-slate-100 mb-1">
            {data ? Number(data.formatted).toFixed(4) : "0.0000"}
          </div>
          <div className="text-sm text-slate-400">{data?.symbol || "ETH"}</div>
        </div>
      )}

      {/* Network Status */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>네트워크 정상</span>
        </div>
      </div>
    </motion.div>
  )
}
