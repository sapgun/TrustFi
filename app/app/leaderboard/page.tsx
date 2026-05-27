"use client"

import { Trophy, Award, Star, Target, TrendingUp, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  // Mock data
  const currentUser = {
    rank: 42,
    address: "0xd8dA...6045",
    score: 850,
    scoreChange: +125,
    tier: "Gold",
    estimatedReward: "$24.50",
  }

  const topUsers = [
    { rank: 1, address: "0x1234...5678", score: 985, scoreChange: +250, tier: "Platinum" },
    { rank: 2, address: "0x8765...4321", score: 972, scoreChange: +230, tier: "Platinum" },
    { rank: 3, address: "0xabcd...efgh", score: 958, scoreChange: +215, tier: "Platinum" },
    { rank: 4, address: "0x9876...1234", score: 945, scoreChange: +200, tier: "Gold" },
    { rank: 5, address: "0x5678...9012", score: 932, scoreChange: +185, tier: "Gold" },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "from-purple-500 to-pink-500"
      case "Gold":
        return "from-yellow-500 to-orange-500"
      case "Silver":
        return "from-slate-400 to-slate-500"
      case "Bronze":
        return "from-orange-700 to-orange-800"
      default:
        return "from-slate-600 to-slate-700"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return Trophy
      case "Gold":
        return Award
      case "Silver":
        return Star
      case "Bronze":
        return Target
      default:
        return Star
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">월간 Trust Score 리더보드</h1>
          <p className="text-sm text-slate-500/70 mb-4">Monthly Trust Score Leaderboard</p>
          <p className="text-slate-400">매달 1일 00:00 UTC 기준 초기화 및 보상 분배</p>
          <p className="text-xs text-slate-500/70">Reset and reward distribution on 1st of each month at 00:00 UTC</p>
        </div>

        {/* Current User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-teal-950/50 to-slate-900 border-2 border-teal-500/50 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">내 순위</div>
              <div className="text-xs text-slate-500/70 mb-2">My Rank</div>
              <div className="text-4xl font-bold text-white">#{currentUser.rank}</div>
            </div>
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getTierColor(currentUser.tier)} flex items-center justify-center`}
            >
              {(() => {
                const Icon = getTierIcon(currentUser.tier)
                return <Icon className="w-8 h-8 text-white" />
              })()}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">Trust Score</div>
              <div className="text-2xl font-bold text-white">{currentUser.score}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">변화량</div>
              <div className="text-xs text-slate-500/70 mb-1">Change</div>
              <div className="text-2xl font-bold text-green-400">+{currentUser.scoreChange}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">티어</div>
              <div className="text-xs text-slate-500/70 mb-1">Tier</div>
              <div className="text-2xl font-bold text-yellow-400">{currentUser.tier}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">예상 보상</div>
              <div className="text-xs text-slate-500/70 mb-1">Est. Reward</div>
              <div className="text-2xl font-bold text-teal-400">{currentUser.estimatedReward}</div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <Users className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-sm text-slate-400 mb-1">총 참여자</div>
            <div className="text-xs text-slate-500/70 mb-2">Total Participants</div>
            <div className="text-3xl font-bold text-white">10,247</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-teal-400 mb-3" />
            <div className="text-sm text-slate-400 mb-1">총 보상 풀</div>
            <div className="text-xs text-slate-500/70 mb-2">Total Reward Pool</div>
            <div className="text-3xl font-bold text-white">$10,000</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-sm text-slate-400 mb-1">다음 리셋</div>
            <div className="text-xs text-slate-500/70 mb-2">Next Reset</div>
            <div className="text-3xl font-bold text-white">7일</div>
          </div>
        </div>

        {/* Top 5 Leaderboard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white">상위 랭커</h2>
            <p className="text-sm text-slate-500/70">Top Rankers</p>
          </div>
          <div className="divide-y divide-slate-800">
            {topUsers.map((user, idx) => {
              const Icon = getTierIcon(user.tier)
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTierColor(user.tier)} flex items-center justify-center`}
                      >
                        <span className="text-xl font-bold text-white">#{user.rank}</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold mb-1">{user.address}</div>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">{user.tier} League</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">{user.score}</div>
                      <div className="text-sm text-green-400">+{user.scoreChange}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-purple-950/30 border border-purple-800/30 rounded-xl p-6 text-center">
          <Zap className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">실제 리더보드는 곧 공개됩니다</h3>
          <p className="text-sm text-slate-500/70 mb-2">Real leaderboard coming soon</p>
          <p className="text-slate-400">현재는 데모 데이터로 표시되고 있습니다</p>
          <p className="text-xs text-slate-500/70">Currently showing demo data</p>
        </div>
      </div>
    </div>
  )
}
