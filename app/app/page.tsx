"use client"

import Link from "next/link"
import { CreditCard, Star, Globe, CheckCircle, Shield } from "lucide-react"
import TrustScoreCard from "@/components/app/TrustScoreCard"
import trustScoreData from "@/data/trustScoreData.json"

export default function AppDashboard() {
  const userData = trustScoreData.users[0]

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">TrustFi에 오신 것을 환영합니다</h1>
        <p className="text-slate-400">안전하고 신뢰할 수 있는 Web3 경험을 시작하세요</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "거래 실행", icon: CreditCard, path: "/app/transactions" },
          { title: "Trust Score", icon: Star, path: "/app/trust-score" },
          { title: "멀티체인", icon: Globe, path: "/app/multichain" },
        ].map((action, idx) => {
          const Icon = action.icon
          return (
            <Link key={idx} href={action.path}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-teal-500/50 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3 group-hover:bg-teal-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{action.title}</h3>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Trust Score Preview */}
      <TrustScoreCard userData={userData} />

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">최근 활동</h2>
        <div className="space-y-3">
          {userData.recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  {activity.type === "safe_transaction" && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {activity.type === "kyc_verified" && <Shield className="w-5 h-5 text-teal-400" />}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {activity.type === "safe_transaction" && "안전한 거래 실행"}
                    {activity.type === "kyc_verified" && "실명 인증 완료"}
                  </div>
                  <div className="text-sm text-slate-400">{new Date(activity.timestamp).toLocaleString("ko-KR")}</div>
                </div>
              </div>
              <div className="text-teal-400 font-bold">+{activity.points}점</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
