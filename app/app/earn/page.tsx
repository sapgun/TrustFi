"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coins, DollarSign, Sparkles, TrendingUp, Award, Lock, Zap, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function EarnPage() {
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)

  // Mock data
  const userTier = "Gold"
  const trustPoints = 810
  const monthlyLimit = 1000
  const usdcValue = (trustPoints * 0.015).toFixed(2)
  const nextTier = "Platinum"
  const pointsToNextTier = 90

  const recentActivities = [
    { action: "안전한 거래", points: 10, time: "2시간 전", icon: Zap },
    { action: "DeFi 참여", points: 15, time: "5시간 전", icon: TrendingUp },
    { action: "DAO 투표", points: 5, time: "1일 전", icon: Users },
    { action: "피싱 차단", points: 20, time: "2일 전", icon: Lock },
  ]

  const pointEarning = [
    { action: "안전한 거래", points: "+10", icon: Zap, color: "text-teal-400" },
    { action: "DeFi 참여", points: "+5~15", icon: TrendingUp, color: "text-purple-400" },
    { action: "DAO 투표", points: "+5", icon: Users, color: "text-blue-400" },
    { action: "피싱 차단", points: "+20", icon: Lock, color: "text-green-400" },
    { action: "30일 무위반", points: "+50", icon: Award, color: "text-yellow-400" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Trust Point 대시보드</h1>
          <p className="text-slate-400">안전한 행동으로 포인트를 적립하고 USDC로 교환하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-teal-950/50 to-slate-950 border-teal-800/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">보유 포인트</div>
                <div className="text-2xl font-bold text-white">{trustPoints} TP</div>
              </div>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                style={{ width: `${(trustPoints / monthlyLimit) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-2">월간 한도: {monthlyLimit} TP</div>
          </Card>

          <Card className="bg-gradient-to-br from-green-950/50 to-slate-950 border-green-800/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">USDC 가치</div>
                <div className="text-2xl font-bold text-white">${usdcValue}</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">교환 비율: 1 TP = 0.015 USDC</div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-950/50 to-slate-950 border-yellow-800/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">현재 티어</div>
                <div className="text-2xl font-bold text-white">{userTier}</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">다음 티어까지: {pointsToNextTier} TP</div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-950/50 to-slate-950 border-purple-800/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">TPT 토큰</div>
                <div className="text-2xl font-bold text-white">Coming Soon</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">Q1 2026 출시 예정</div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Claim USDC */}
          <Card className="bg-slate-950 border-slate-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">USDC 캐시아웃</h2>
                <p className="text-sm text-slate-400">Trust Point를 USDC로 교환</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">교환 가능 금액</span>
                <span className="text-3xl font-bold text-green-400">${usdcValue} USDC</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">보유 포인트</span>
                <span className="text-white">{trustPoints} TP</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">교환 비율</span>
                <span className="text-white">1 TP = 0.015 USDC</span>
              </div>
            </div>

            <Button
              onClick={() => setShowClaimModal(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6 text-lg"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              USDC 클레임하기
            </Button>

            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-400">최소 캐시아웃: 30 USDC (Gold 티어)</div>
              </div>
            </div>
          </Card>

          {/* TPT Token Swap */}
          <Card className="bg-slate-950 border-slate-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">TPT 토큰 스왑</h2>
                <p className="text-sm text-slate-400">Trust Point를 TPT로 전환</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-slate-400 mb-2">예상 TPT 수량</div>
                <div className="text-3xl font-bold text-purple-400">{trustPoints} TPT</div>
                <div className="text-sm text-slate-500 mt-2">1 TP = 1 TPT</div>
              </div>
            </div>

            <Button
              onClick={() => setShowSwapModal(true)}
              disabled
              className="w-full bg-purple-500/50 text-white font-semibold py-6 text-lg cursor-not-allowed"
            >
              <Lock className="w-5 h-5 mr-2" />
              Q1 2026 출시 예정
            </Button>

            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-sm text-purple-400 mb-2 font-semibold">TPT 토큰 유틸리티</div>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• 거버넌스 투표 참여</li>
                <li>• Vault 스테이킹 보상</li>
                <li>• Trust Score 버프</li>
                <li>• 파트너십 예치</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Point Earning Guide */}
        <Card className="bg-slate-950 border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">포인트 획득 방법</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {pointEarning.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-slate-900 rounded-xl p-4 text-center hover:bg-slate-800 transition-colors">
                  <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                  <div className="text-white font-semibold mb-2">{item.action}</div>
                  <div className="text-2xl font-bold text-teal-400">{item.points}</div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-slate-950 border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">최근 활동</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => {
              const Icon = activity.icon
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{activity.action}</div>
                      <div className="text-sm text-slate-500">{activity.time}</div>
                    </div>
                  </div>
                  <div className="text-teal-400 font-bold">+{activity.points} TP</div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Claim Modal */}
        {showClaimModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-950 border border-slate-800 rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">USDC 클레임 확인</h3>
                <p className="text-slate-400">Trust Point를 USDC로 교환합니다</p>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400">교환 포인트</span>
                  <span className="text-white font-semibold">{trustPoints} TP</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400">수령 금액</span>
                  <span className="text-green-400 font-bold text-xl">${usdcValue} USDC</span>
                </div>
                <div className="border-t border-slate-800 pt-3 mt-3">
                  <div className="text-xs text-slate-500">클레임 후 포인트는 차감되며, 다음 달 1일에 초기화됩니다.</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setShowClaimModal(false)} variant="outline" className="flex-1">
                  취소
                </Button>
                <Button
                  onClick={() => {
                    // Mock claim action
                    alert("클레임 기능은 곧 출시됩니다!")
                    setShowClaimModal(false)
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  클레임하기
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
