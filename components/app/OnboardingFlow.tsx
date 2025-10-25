"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogIn, Wallet, Star } from "lucide-react"

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    {
      title: "소셜 로그인",
      description: "Google, Twitter, Discord 중 선택",
      icon: LogIn,
      action: "Google로 로그인",
    },
    {
      title: "지갑 연결",
      description: "MetaMask, WalletConnect 지원",
      icon: Wallet,
      action: "지갑 연결",
    },
    {
      title: "Trust Score 생성",
      description: "초기 50점으로 시작",
      icon: Star,
      action: "Trust Score 생성",
    },
  ]

  const handleNext = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (step < steps.length) {
      setStep(step + 1)
      setIsLoading(false)
    } else {
      router.push("/app")
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-full h-2 rounded-full mx-1 ${idx + 1 <= step ? "bg-teal-500" : "bg-slate-800"}`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-400 text-center">
          Step {step} of {steps.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            {(() => {
              const Icon = steps[step - 1].icon
              return <Icon className="w-10 h-10 text-teal-400" />
            })()}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{steps[step - 1].title}</h2>
          <p className="text-xl text-slate-400 mb-8">{steps[step - 1].description}</p>

          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "처리 중..." : steps[step - 1].action}
          </button>
        </motion.div>
      </AnimatePresence>

      {step < steps.length && (
        <div className="text-center mt-6">
          <button onClick={() => router.push("/app")} className="text-slate-500 hover:text-slate-300 underline">
            건너뛰기
          </button>
        </div>
      )}
    </div>
  )
}
