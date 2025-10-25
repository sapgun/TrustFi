"use client"

import OnboardingFlow from "@/components/app/OnboardingFlow"

export default function OnboardingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">TrustFi 온보딩</h1>
        <p className="text-xl text-slate-400">30초면 시작할 수 있습니다</p>
      </div>
      <OnboardingFlow />
    </div>
  )
}
