"use client"

import { motion } from "framer-motion"
import { getTierColor, getTierIcon } from "@/lib/nft/trust-nft"

interface TrustNFTBadgeProps {
  tier: string
  trustScore: number
  size?: "sm" | "md" | "lg"
  showScore?: boolean
}

export default function TrustNFTBadge({ tier, trustScore, size = "md", showScore = true }: TrustNFTBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  const iconSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 bg-gradient-to-r ${getTierColor(tier)} text-white font-bold rounded-full ${sizeClasses[size]} shadow-lg`}
    >
      <span className={iconSizes[size]}>{getTierIcon(tier)}</span>
      <span>{tier}</span>
      {showScore && <span className="opacity-90">({trustScore})</span>}
    </motion.div>
  )
}
