"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogIn, Wallet, Star, CheckCircle } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"
import GoogleLogin from "@/components/auth/GoogleLogin"

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const { authenticated, ready, user } = usePrivy()

  useEffect(() => {
    if (ready && authenticated && step === 1) {
      setTimeout(() => setStep(2), 1000)
    }
  }, [ready, authenticated, step])

  const steps = [
    {
      title: "소셜 로그인",
      description: "Google 계정으로 간편하게 시작하세요",
      icon: LogIn,
    },
    {
      title: "지갑 연결",
      description: "임베디드 지갑이 자동으로 생성됩니다",
      icon: Wallet,
    },
    {
      title: "Trust Score 생성",
      description: "초기 50점으로 시작합니다",
      icon: Star,
    },
  ]

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1)
    } else {
      router.push("/app")
    }
  }

  const currentStep = steps[step - 1]
  const Icon = currentStep.icon

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-full h-2 rounded-full mx-1 transition-colors ${
                idx + 1 <= step ? "bg-teal-500" : "bg-slate-800"
              }`}
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
            <Icon className="w-10 h-10 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{currentStep.title}</h2>
          <p className="text-xl text-slate-400 mb-8">{currentStep.description}</p>

          {step === 1 && !authenticated && (
            <div className="max-w-sm mx-auto">
              <GoogleLogin />
            </div>
          )}

          {step === 1 && authenticated && (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">로그인 완료!</span>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {user?.wallet?.address ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">지갑 생성 완료!</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">지갑 주소</p>
                    <p className="text-teal-400 font-mono text-sm break-all">{user.wallet.address}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all"
                  >
                    다음 단계
                  </button>
                </div>
              ) : (
                <div className="text-slate-400">지갑 생성 중...</div>
              )}
            </div>
          )}

          {step === 3 && (
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all"
            >
              시작하기
            </button>
          )}
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
