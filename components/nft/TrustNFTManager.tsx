"use client"

import { useState, useEffect } from "react"
import { useWallets, usePrivy } from "@privy-io/react-auth"
import { motion } from "framer-motion"
import { Award, Sparkles } from "lucide-react"
import { getCachedTrustScore } from "@/lib/trust-score/calculator"
import { getTrustNFT, mintTrustNFT, type TrustNFTData } from "@/lib/nft/trust-nft"
import TrustNFTBadge from "./TrustNFTBadge"

export default function TrustNFTManager() {
  const { ready } = usePrivy()
  const { wallets } = useWallets()
  const [nft, setNft] = useState<TrustNFTData | null>(null)
  const [loading, setLoading] = useState(true)
  const [minting, setMinting] = useState(false)
  const [canMint, setCanMint] = useState(false)
  const [trustScore, setTrustScore] = useState(0)

  const wallet = ready && wallets.length > 0 ? wallets[0] : null

  useEffect(() => {
    async function loadNFT() {
      if (!wallet?.address) {
        setLoading(false)
        return
      }

      try {
        console.log("[v0] Loading Trust NFT for:", wallet.address)

        const [existingNFT, score] = await Promise.all([
          getTrustNFT(wallet.address),
          getCachedTrustScore(wallet.address),
        ])

        setNft(existingNFT)
        setTrustScore(score.total)
        setCanMint(!existingNFT && score.total >= 20)

        console.log("[v0] NFT loaded:", existingNFT)
        console.log("[v0] Trust Score:", score.total)
      } catch (error) {
        console.error("[v0] Failed to load NFT:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNFT()
  }, [wallet])

  const handleMint = async () => {
    if (!wallet?.address || !canMint) return

    setMinting(true)
    try {
      console.log("[v0] Minting Trust NFT...")
      const newNFT = await mintTrustNFT(wallet.address, trustScore)

      if (newNFT) {
        setNft(newNFT)
        setCanMint(false)
        alert("🎉 Trust Score NFT가 발급되었습니다!")
      } else {
        alert("❌ NFT 발급에 실패했습니다. Trust Score가 20 이상이어야 합니다.")
      }
    } catch (error) {
      console.error("[v0] Mint failed:", error)
      alert("❌ NFT 발급 중 오류가 발생했습니다.")
    } finally {
      setMinting(false)
    }
  }

  if (loading || !ready) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto" />
      </div>
    )
  }

  if (!wallet) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Award className="h-6 w-6 text-teal-500" />
        Trust Score NFT
      </h3>

      {nft ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border-2 border-teal-200">
            <div>
              <div className="text-sm text-gray-600 mb-2">Your Trust NFT</div>
              <TrustNFTBadge tier={nft.tier} trustScore={nft.trustScore} size="lg" />
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Token ID</div>
              <div className="text-xs font-mono text-gray-700">{nft.tokenId.slice(0, 16)}...</div>
              <div className="text-xs text-gray-500 mt-2">발급일: {new Date(nft.mintedAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">현재 점수</div>
              <div className="text-2xl font-bold text-gray-900">{nft.trustScore}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">티어</div>
              <div className="text-2xl font-bold text-gray-900">{nft.tier}</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <div className="font-semibold mb-1">NFT 혜택</div>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>거래 시 상대방에게 신뢰도 표시</li>
                  <li>티어별 거래 한도 증가</li>
                  <li>보안 검사 우선 처리</li>
                  <li>커뮤니티 투표권 획득</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ) : canMint ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <div className="text-6xl mb-4">🎖️</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Trust Score NFT 발급 가능!</h4>
          <p className="text-gray-600 mb-6">
            현재 Trust Score: <span className="font-bold text-teal-600">{trustScore}</span>
          </p>
          <button
            onClick={handleMint}
            disabled={minting}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {minting ? "발급 중..." : "NFT 발급하기"}
          </button>
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">NFT 발급 조건 미달</h4>
          <p className="text-gray-600">Trust Score가 20 이상이어야 NFT를 발급받을 수 있습니다.</p>
          <p className="text-sm text-gray-500 mt-2">
            현재 점수: <span className="font-bold">{trustScore}</span> / 필요 점수:{" "}
            <span className="font-bold">20</span>
          </p>
        </div>
      )}
    </div>
  )
}
