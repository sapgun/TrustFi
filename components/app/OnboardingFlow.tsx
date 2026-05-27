"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogIn, Wallet, Star, CheckCircle, Loader2 } from "lucide-react"
import { usePrivy, useWallets, useCreateWallet } from "@privy-io/react-auth"
import GoogleLogin from "@/components/auth/GoogleLogin"
import EmailLogin from "@/components/auth/EmailLogin"

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const { authenticated, ready } = usePrivy()
  const { wallets } = useWallets()
  const { createWallet } = useCreateWallet()
  const [creatingWallet, setCreatingWallet] = useState(false)

  useEffect(() => {
    if (ready && authenticated && step === 1) {
      console.log("[v0] 로그인 완료, 다음 단계로 이동")
      setTimeout(() => setStep(2), 1000)
    }
  }, [ready, authenticated, step])

  useEffect(() => {
    if (ready && authenticated && step === 2 && wallets.length === 0 && !creatingWallet) {
      console.log("[v0] 지갑이 없음, 자동 생성 시작")
      handleCreateWallet()
    }
  }, [ready, authenticated, step, wallets, creatingWallet])

  const handleCreateWallet = async () => {
    setCreatingWallet(true)
    try {
      console.log("[v0] createWallet 호출")
      await createWallet()
      console.log("[v0] 지갑 생성 완료")
    } catch (error) {
      console.error("[v0] 지갑 생성 실패:", error)
    } finally {
      setCreatingWallet(false)
    }
  }

  const steps = [
    {
      title: "소셜 로그인",
      description: "Google 또는 이메일 계정으로 간편하게 시작하세요",
      icon: LogIn,
    },
    {
      title: "지갑 생성",
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

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy")

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

          {/* Step 1: Login */}
          {step === 1 && !authenticated && (
            <div className="max-w-sm mx-auto space-y-3">
              <GoogleLogin />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-500">또는</span>
                </div>
              </div>
              <EmailLogin />
            </div>
          )}

          {step === 1 && authenticated && (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">로그인 완료!</span>
            </div>
          )}

          {/* Step 2: Wallet Creation */}
          {step === 2 && (
            <div className="space-y-4">
              {embeddedWallet ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">지갑 생성 완료!</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">지갑 주소</p>
                    <p className="text-teal-400 font-mono text-sm break-all">{embeddedWallet.address}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all"
                  >
                    다음 단계
                  </button>
                </div>
              ) : creatingWallet ? (
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
                  <span>지갑 생성 중...</span>
                </div>
              ) : (
                <button
                  onClick={handleCreateWallet}
                  className="px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all"
                >
                  지갑 생성하기
                </button>
              )}
            </div>
          )}

          {/* Step 3: Trust Score */}
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
