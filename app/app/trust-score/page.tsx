"use client"

import { Shield, TrendingUp, Globe, CheckCircle } from "lucide-react"
import TrustScoreCard from "@/components/app/TrustScoreCard"
import trustScoreData from "@/data/trustScoreData.json"

export default function TrustScorePage() {
  const userData = trustScoreData.users[0]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Trust Score</h1>
        <p className="text-xl text-slate-400">안전한 행동으로 신뢰를 쌓고 보상을 받으세요</p>
      </div>

      <TrustScoreCard userData={userData} detailed />

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Trust Score 올리는 방법</h2>
        <div className="space-y-4">
          {[
            { action: "실명 인증 완료", points: "+50점", icon: Shield },
            { action: "안전한 거래 실행", points: "+10점", icon: CheckCircle },
            { action: "위험한 거래 차단", points: "+5점", icon: TrendingUp },
            { action: "멀티체인 거래 성공", points: "+15점", icon: Globe },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-teal-400" />
                  <div className="font-semibold text-white">{item.action}</div>
                </div>
                <div className="text-teal-400 font-bold">{item.points}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
