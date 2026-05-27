"use client"

import { useState, useEffect } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, CheckCircle, Clock } from "lucide-react"
import { generateNLReview, type NLReviewResult } from "@/lib/security/nl-review"
import { runSecurityLayers, type SecurityCheckResult } from "@/lib/security/security-layers"
import { simulateTransaction } from "@/lib/alchemy/transaction-simulator"
import { getCachedTrustScore } from "@/lib/trust-score/calculator"
import { getTrustNFT, mintTrustNFT, upgradeTrustNFT } from "@/lib/nft/trust-nft"
import TrustNFTBadge from "@/components/nft/TrustNFTBadge"

export default function SecureSendTransaction() {
  const { ready, authenticated } = usePrivy()
  const { wallets } = useWallets()

  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"input" | "review" | "executing" | "success">("input")

  const [nlReview, setNlReview] = useState<NLReviewResult | null>(null)
  const [securityCheck, setSecurityCheck] = useState<SecurityCheckResult | null>(null)
  const [delayTimer, setDelayTimer] = useState(0)
  const [canCancel, setCanCancel] = useState(false)
  const [cancelTimer, setCancelTimer] = useState(0)

  const [recipientNFT, setRecipientNFT] = useState<any>(null)
  const [loadingRecipient, setLoadingRecipient] = useState(false)

  const wallet = ready && wallets.length > 0 ? wallets[0] : null

  useEffect(() => {
    async function loadRecipientNFT() {
      if (!to || to.length < 42) {
        setRecipientNFT(null)
        return
      }

      setLoadingRecipient(true)
      try {
        const nft = await getTrustNFT(to)
        setRecipientNFT(nft)
      } catch (error) {
        console.error("[v0] Failed to load recipient NFT:", error)
        setRecipientNFT(null)
      } finally {
        setLoadingRecipient(false)
      }
    }

    loadRecipientNFT()
  }, [to])

  const handleAnalyze = async () => {
    if (!to || !amount || !wallet) return

    setStep("review")

    const transaction = {
      from: wallet.address,
      to,
      value: amount,
      data: "0x",
    }

    try {
      console.log("[v0] Simulating transaction...")
      const simulation = await simulateTransaction({
        from: wallet.address,
        to,
        value: amount,
        gas: "0x5208",
        gasPrice: "0x3b9aca00",
      })

      console.log("[v0] Generating NL review...")
      const review = await generateNLReview(transaction, simulation)
      setNlReview(review)

      console.log("[v0] Running security layers...")
      const security = await runSecurityLayers(transaction, review, simulation)
      setSecurityCheck(security)

      console.log("[v0] Security check complete:", security)
    } catch (error) {
      console.error("[v0] Security check error:", error)
    }
  }

  const handleExecute = async () => {
    if (!securityCheck?.canProceed) return

    const delay = securityCheck.delaySeconds || 0

    if (delay > 0) {
      setDelayTimer(delay)
      setStep("executing")

      const interval = setInterval(() => {
        setDelayTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            executeTransaction()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      executeTransaction()
    }
  }

  const executeTransaction = async () => {
    console.log("[v0] Executing transaction...")
    setStep("executing")

    try {
      if (!wallet) throw new Error("Wallet not found")

      const provider = await wallet.getEthereumProvider()

      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: wallet.address,
            to,
            value: `0x${(Number.parseFloat(amount) * 1e18).toString(16)}`,
            gas: "0x5208",
          },
        ],
      })

      console.log("[v0] Transaction sent:", txHash)

      await updateUserTrustScore(wallet.address)

      setStep("success")
      setCanCancel(true)
      setCancelTimer(30)

      const interval = setInterval(() => {
        setCancelTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setCanCancel(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error("[v0] Transaction failed:", error)
      alert("거래 실행 실패: " + (error as Error).message)
      setStep("input")
    }
  }

  const updateUserTrustScore = async (address: string) => {
    try {
      const trustScore = await getCachedTrustScore(address)
      const existingNFT = await getTrustNFT(address)

      if (existingNFT) {
        await upgradeTrustNFT(address, trustScore.total)
      } else if (trustScore.total >= 20) {
        await mintTrustNFT(address, trustScore.total)
      }
    } catch (error) {
      console.error("[v0] Failed to update Trust Score:", error)
    }
  }

  const handleCancel = () => {
    console.log("[v0] Transaction cancelled")
    setStep("input")
    setNlReview(null)
    setSecurityCheck(null)
    setDelayTimer(0)
    setCanCancel(false)
    setCancelTimer(0)
  }

  const handleEmergencyCancel = () => {
    console.log("[v0] Emergency cancel triggered!")
    alert("🚨 거래가 긴급 취소되었습니다!")
    handleCancel()
  }

  if (!ready || !authenticated || !wallet) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <p className="text-gray-600">지갑을 연결해주세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Input Form */}
      {step === "input" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal-500" />
            보안 거래 전송
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수신자 주소</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              {loadingRecipient && <div className="mt-2 text-sm text-gray-500">수신자 신뢰도 확인 중...</div>}
              {recipientNFT && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">수신자 신뢰도:</span>
                  <TrustNFTBadge tier={recipientNFT.tier} trustScore={recipientNFT.trustScore} size="sm" />
                </div>
              )}
              {!loadingRecipient && to.length >= 42 && !recipientNFT && (
                <div className="mt-2 text-sm text-yellow-600">⚠️ 수신자의 Trust Score NFT가 없습니다</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">금액 (ETH)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.001"
                step="0.001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!to || !amount}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              보안 검사 시작
            </button>
          </div>
        </motion.div>
      )}

      {/* Security Review */}
      {step === "review" && nlReview && securityCheck && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* NL Review */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>📖</span> Natural Language Review
            </h3>
            <div
              className={`p-4 rounded-lg border-2 ${
                nlReview.confidence > 75
                  ? "bg-green-50 border-green-200"
                  : nlReview.confidence > 50
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <p className="text-gray-900 font-medium mb-2">{nlReview.summary}</p>
              <div className="text-sm text-gray-600">신뢰도: {nlReview.confidence}%</div>
            </div>

            {nlReview.risks.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ 위험 요소</h4>
                <ul className="list-disc list-inside space-y-1">
                  {nlReview.risks.map((risk, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nlReview.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">💡 권장 사항</h4>
                <ul className="list-disc list-inside space-y-1">
                  {nlReview.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 6-Layer Security */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ 6-Layer Security OS</h3>
            <div className="space-y-3">
              {securityCheck.layers.map((layer, idx) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    layer.status === "pass"
                      ? "bg-green-50 border-green-200"
                      : layer.status === "warning"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{layer.icon}</div>
                      <div>
                        <div className="font-bold text-gray-900">{layer.name}</div>
                        <div className="text-sm text-gray-600">{layer.message}</div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        layer.status === "pass"
                          ? "bg-green-500 text-white"
                          : layer.status === "warning"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {layer.status === "pass" ? "통과" : layer.status === "warning" ? "경고" : "차단"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {securityCheck.canProceed ? (
              <>
                <button
                  onClick={handleExecute}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all"
                >
                  거래 실행
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  취소
                </button>
              </>
            ) : (
              <div className="flex-1 py-4 bg-red-500 text-white font-bold rounded-lg text-center">
                🛑 거래 차단됨 - 보안 위험 감지
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Executing */}
      {step === "executing" && delayTimer > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-white text-center"
        >
          <Clock className="h-16 w-16 mx-auto mb-4 animate-pulse" />
          <h3 className="text-3xl font-bold mb-2">지연 보호 활성화</h3>
          <p className="text-xl mb-4">{delayTimer}초 후 실행됩니다...</p>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors"
          >
            취소
          </button>
        </motion.div>
      )}

      {/* Success + Emergency Cancel */}
      <AnimatePresence>
        {step === "success" && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500 text-white rounded-xl p-8 text-center"
            >
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">거래 성공!</h3>
              <p className="text-lg">Trust Score +10점 획득</p>
            </motion.div>

            {canCancel && cancelTimer > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">🚨 Panic Revoke 활성화</h3>
                    <p className="text-orange-100">{cancelTimer}초 내에 긴급 취소 가능합니다.</p>
                  </div>
                  <button
                    onClick={handleEmergencyCancel}
                    className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
                  >
                    긴급 취소
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
