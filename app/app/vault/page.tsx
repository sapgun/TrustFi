"use client"

import { Lock, TrendingUp, Zap, Coins, ArrowRight, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function VaultPage() {
  // Mock data
  const userVault = {
    deposited: "5.0 stETH",
    value: "$12,450",
    apy: "15.2%",
    tier: "Gold",
    multiplier: "1.3x",
    estimatedYield: "$1,892/year",
  }

  const vaultOptions = [
    {
      name: "ETH Vault",
      apy: "12.5%",
      tvl: "$125M",
      risk: "Low",
      partners: ["Lido", "EigenLayer"],
    },
    {
      name: "LST Vault",
      apy: "15.2%",
      tvl: "$85M",
      risk: "Medium",
      partners: ["Pendle", "Aave"],
    },
    {
      name: "Stable Vault",
      apy: "8.5%",
      tvl: "$200M",
      risk: "Very Low",
      partners: ["Compound", "Aave"],
    },
  ]

  const tierMultipliers = [
    { tier: "Platinum", multiplier: "1.5x", color: "from-purple-500 to-pink-500" },
    { tier: "Gold", multiplier: "1.3x", color: "from-yellow-500 to-orange-500" },
    { tier: "Silver", multiplier: "1.1x", color: "from-slate-400 to-slate-500" },
    { tier: "Bronze", multiplier: "1.0x", color: "from-orange-700 to-orange-800" },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Trust Vault</h1>
          <p className="text-sm text-slate-500/70 mb-4">Staking & LST Expansion</p>
          <p className="text-slate-400">Trust Score가 높을수록 더 큰 스테이킹 혜택</p>
          <p className="text-xs text-slate-500/70">Higher Trust Score = Better staking benefits</p>
        </div>

        {/* User Vault Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-teal-950/50 to-slate-900 border-2 border-teal-500/50 rounded-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">내 Vault</h2>
              <p className="text-sm text-slate-500/70">My Vault</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">티어</div>
              <div className="text-xs text-slate-500/70 mb-1">Tier</div>
              <div className="text-2xl font-bold text-yellow-400">{userVault.tier}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-1">예치 금액</div>
              <div className="text-xs text-slate-500/70 mb-2">Deposited</div>
              <div className="text-2xl font-bold text-white mb-1">{userVault.deposited}</div>
              <div className="text-sm text-slate-400">{userVault.value}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">APY</div>
              <div className="text-2xl font-bold text-teal-400 mb-1">{userVault.apy}</div>
              <div className="text-sm text-slate-400">배율: {userVault.multiplier}</div>
              <div className="text-xs text-slate-500/70">Multiplier: {userVault.multiplier}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">예상 수익</div>
              <div className="text-xs text-slate-500/70 mb-2">Est. Yield</div>
              <div className="text-2xl font-bold text-green-400">{userVault.estimatedYield}</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors">
              추가 예치
            </button>
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors">
              출금
            </button>
          </div>
        </motion.div>

        {/* Tier Multipliers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">티어별 보상 배율</h2>
          <p className="text-sm text-slate-500/70 mb-6">Reward Multiplier by Tier</p>
          <div className="grid md:grid-cols-4 gap-4">
            {tierMultipliers.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${item.color} bg-opacity-10 border border-slate-800 rounded-xl p-6 text-center`}
              >
                <div className="text-lg font-semibold text-white mb-2">{item.tier}</div>
                <div className="text-3xl font-bold text-white">{item.multiplier}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vault Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Vault 옵션</h2>
          <p className="text-sm text-slate-500/70 mb-6">Vault Options</p>
          <div className="grid md:grid-cols-3 gap-6">
            {vaultOptions.map((vault, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{vault.name}</h3>
                  <Lock className="w-6 h-6 text-teal-400" />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">APY</span>
                    <span className="text-lg font-bold text-teal-400">{vault.apy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">TVL</span>
                    <span className="text-white font-semibold">{vault.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">위험도</span>
                    <span className="text-xs text-slate-500/70">Risk</span>
                    <span
                      className={`text-sm font-semibold ${vault.risk === "Low" || vault.risk === "Very Low" ? "text-green-400" : "text-yellow-400"}`}
                    >
                      {vault.risk}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">파트너</div>
                  <div className="text-xs text-slate-500/70 mb-2">Partners</div>
                  <div className="flex gap-2">
                    {vault.partners.map((partner, partnerIdx) => (
                      <span key={partnerIdx} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  예치하기
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">작동 방식</h2>
          <p className="text-sm text-slate-500/70 mb-6">How it Works</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. 예치</h3>
              <p className="text-sm text-slate-400">ETH 또는 LST를 Trust Vault에 예치합니다</p>
              <p className="text-xs text-slate-500/70">Deposit ETH or LST to Trust Vault</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. ReStaking</h3>
              <p className="text-sm text-slate-400">파트너 프로토콜에 자동으로 ReStaking됩니다</p>
              <p className="text-xs text-slate-500/70">Auto ReStaking to partner protocols</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. 보상</h3>
              <p className="text-sm text-slate-400">Trust Score 기반 배율로 보상을 받습니다</p>
              <p className="text-xs text-slate-500/70">Earn rewards with Trust Score multiplier</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-purple-950/30 border border-purple-800/30 rounded-xl p-6 text-center">
          <Info className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">실제 Vault는 곧 공개됩니다</h3>
          <p className="text-sm text-slate-500/70 mb-2">Real Vault coming soon</p>
          <p className="text-slate-400">현재는 데모 UI로 표시되고 있습니다</p>
          <p className="text-xs text-slate-500/70">Currently showing demo UI</p>
        </div>
      </div>
    </div>
  )
}
