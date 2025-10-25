"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useEffect, useState } from "react"
import { syncUserToSupabase } from "@/lib/auth/sync-user"
import { createClient } from "@/lib/supabase/client"
import { User, Mail, Shield, Calendar, Award, Camera, Sparkles } from "lucide-react"
import {
  getTrustNFT,
  mintTrustNFT,
  upgradeTrustNFT,
  canUpgradeNFT,
  getTierColor,
  getTierIcon,
} from "@/lib/nft/trust-nft"
import type { TrustNFTData } from "@/lib/nft/trust-nft"

interface UserProfile {
  id: string
  privy_user_id: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  trust_score: number
  trust_level: string
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user, authenticated, ready } = usePrivy()
  const { wallets } = useWallets()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [nft, setNft] = useState<TrustNFTData | null>(null)
  const [canUpgrade, setCanUpgrade] = useState(false)
  const [nftLoading, setNftLoading] = useState(false)

  useEffect(() => {
    if (ready && authenticated && user) {
      loadProfile()
    } else if (ready && !authenticated) {
      setLoading(false)
    }
  }, [ready, authenticated, user])

  useEffect(() => {
    if (profile && wallets.length > 0) {
      loadNFT()
    }
  }, [profile, wallets])

  const loadProfile = async () => {
    if (!user) return

    try {
      const syncResult = await syncUserToSupabase(user)

      if (syncResult.success) {
        const supabase = createClient()
        const { data, error } = await supabase.from("user_profiles").select("*").eq("privy_user_id", user.id).single()

        if (data) {
          setProfile(data)
          setDisplayName(data.display_name || "")
          setAvatarUrl(data.avatar_url || "")
        }
      }
    } catch (error) {
      console.error("[v0] Failed to load profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadNFT = async () => {
    const wallet = wallets[0]
    if (!wallet?.address) return

    try {
      const nftData = await getTrustNFT(wallet.address)
      setNft(nftData)

      if (nftData && profile) {
        const canUpgradeNow = await canUpgradeNFT(wallet.address, profile.trust_score)
        setCanUpgrade(canUpgradeNow)
      }
    } catch (error) {
      console.error("[v0] Failed to load NFT:", error)
    }
  }

  const handleMintNFT = async () => {
    const wallet = wallets[0]
    if (!wallet?.address || !profile) return

    if (profile.trust_score < 20) {
      alert("Trust Score가 20 이상이어야 NFT를 발급받을 수 있습니다.")
      return
    }

    setNftLoading(true)
    try {
      const nftData = await mintTrustNFT(wallet.address, profile.trust_score)
      if (nftData) {
        setNft(nftData)
        alert("Trust NFT가 성공적으로 발급되었습니다!")
      } else {
        alert("NFT 발급에 실패했습니다.")
      }
    } catch (error) {
      console.error("[v0] Mint NFT error:", error)
      alert("NFT 발급 중 오류가 발생했습니다.")
    } finally {
      setNftLoading(false)
    }
  }

  const handleUpgradeNFT = async () => {
    const wallet = wallets[0]
    if (!wallet?.address || !profile) return

    setNftLoading(true)
    try {
      const nftData = await upgradeTrustNFT(wallet.address, profile.trust_score)
      if (nftData) {
        setNft(nftData)
        setCanUpgrade(false)
        alert(`Trust NFT가 ${nftData.tier} 티어로 업그레이드되었습니다!`)
      } else {
        alert("NFT 업그레이드에 실패했습니다.")
      }
    } catch (error) {
      console.error("[v0] Upgrade NFT error:", error)
      alert("NFT 업그레이드 중 오류가 발생했습니다.")
    } finally {
      setNftLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!user || !profile) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("user_profiles")
        .update({
          display_name: displayName,
          avatar_url: avatarUrl,
        })
        .eq("privy_user_id", user.id)

      if (!error) {
        setProfile({ ...profile, display_name: displayName, avatar_url: avatarUrl })
        setEditing(false)
      }
    } catch (error) {
      console.error("[v0] Failed to update profile:", error)
    }
  }

  const handleImageUrlChange = (url: string) => {
    setAvatarUrl(url)
  }

  if (!ready || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-teal-400">로딩 중...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-slate-400 mb-4">로그인이 필요합니다</div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-400">프로필을 불러올 수 없습니다</div>
      </div>
    )
  }

  const getTrustLevelColor = (level: string) => {
    switch (level) {
      case "Platinum":
        return "text-cyan-400"
      case "Gold":
        return "text-yellow-400"
      case "Silver":
        return "text-slate-300"
      default:
        return "text-orange-400"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">프로필</h1>
        <p className="text-slate-400">내 계정 정보 및 Trust Score</p>
      </div>

      <div className="grid gap-6">
        {/* 프로필 카드 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {(editing ? avatarUrl : profile.avatar_url) ? (
                  <img
                    src={(editing ? avatarUrl : profile.avatar_url) || "/placeholder.svg"}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              {editing && (
                <div className="absolute -bottom-2 -right-2 bg-teal-500 rounded-full p-2 cursor-pointer hover:bg-teal-600 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {editing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="이름 입력"
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white">{profile.display_name}</h2>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getTrustLevelColor(profile.trust_level)} bg-slate-800`}
                >
                  {profile.trust_level}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 mb-4">
                <Mail className="w-4 h-4" />
                <span>{profile.email || "이메일 없음"}</span>
              </div>

              {editing && (
                <div className="mb-4">
                  <label className="block text-sm text-slate-400 mb-2">프로필 사진 URL</label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    이미지 URL을 입력하거나 비워두면 기본 아바타가 표시됩니다
                  </p>
                </div>
              )}

              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false)
                      setDisplayName(profile.display_name || "")
                      setAvatarUrl(profile.avatar_url || "")
                    }}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  프로필 수정
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Score 카드 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-teal-400" />
            <h3 className="text-xl font-bold text-white">Trust Score</h3>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <div className="text-5xl font-bold text-teal-400">{profile.trust_score}</div>
            <div className="text-slate-400">/ 1000</div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all"
              style={{ width: `${(profile.trust_score / 1000) * 100}%` }}
            />
          </div>

          <p className="text-slate-400 text-sm">안전한 거래를 통해 Trust Score를 높이고 더 많은 혜택을 받으세요</p>
        </div>

        {/* 계정 정보 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">계정 정보</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-400">가입일</div>
                <div className="text-white">{new Date(profile.created_at).toLocaleDateString("ko-KR")}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-400">등급</div>
                <div className={`font-semibold ${getTrustLevelColor(profile.trust_level)}`}>{profile.trust_level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust NFT 카드 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-teal-400" />
            <h3 className="text-xl font-bold text-white">Trust NFT</h3>
          </div>

          {nft ? (
            <div>
              <div className={`bg-gradient-to-br ${getTierColor(nft.tier)} rounded-xl p-6 mb-4`}>
                <div className="text-center">
                  <div className="text-6xl mb-2">{getTierIcon(nft.tier)}</div>
                  <div className="text-2xl font-bold text-white mb-1">{nft.tier}</div>
                  <div className="text-white/80 text-sm">Trust Score: {nft.trustScore}</div>
                </div>
              </div>

              <div className="text-sm text-slate-400 mb-4">
                <div>발급일: {nft.mintedAt.toLocaleDateString("ko-KR")}</div>
                <div>마지막 업데이트: {nft.lastUpdated.toLocaleDateString("ko-KR")}</div>
              </div>

              {canUpgrade && (
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-teal-400 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">업그레이드 가능!</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">Trust Score가 상승하여 NFT를 업그레이드할 수 있습니다.</p>
                  <button
                    onClick={handleUpgradeNFT}
                    disabled={nftLoading}
                    className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {nftLoading ? "업그레이드 중..." : "NFT 업그레이드"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-slate-400 mb-4">Trust Score를 기반으로 NFT를 발급받아 신뢰도를 증명하세요.</p>
              {profile && profile.trust_score >= 20 ? (
                <button
                  onClick={handleMintNFT}
                  disabled={nftLoading}
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {nftLoading ? "발급 중..." : "Trust NFT 발급받기"}
                </button>
              ) : (
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">
                    Trust Score가 20 이상이어야 NFT를 발급받을 수 있습니다.
                    <br />
                    현재 점수: {profile?.trust_score || 0}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
