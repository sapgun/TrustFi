"use client"

import { useEffect, useState } from "react"
import { getWalletBalance } from "@/app/actions/blockchain"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface WalletInfoProps {
  address: string
}

export function SecureWalletInfo({ address }: WalletInfoProps) {
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getWalletBalance(address)
      if (result.success) {
        setBalance(result.balance)
      }
      setLoading(false)
    }

    if (address) {
      fetchData()
    }
  }, [address])

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-teal-400" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-slate-900 border-slate-800">
      <h3 className="text-lg font-semibold text-white mb-2">지갑 잔액</h3>
      <p className="text-2xl font-bold text-teal-400">
        {balance ? `${(Number(balance) / 1e18).toFixed(4)} ETH` : "조회 실패"}
      </p>
      <p className="text-sm text-slate-400 mt-2">서버 액션을 통해 안전하게 조회됨</p>
    </Card>
  )
}
