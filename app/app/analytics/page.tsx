"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { Card, CardContent } from "@/components/ui/card"
import TransactionAnalytics from "@/components/analytics/TransactionAnalytics"
import { Wallet } from "lucide-react"

export default function AnalyticsPage() {
  const { ready, authenticated } = usePrivy()
  const { wallets } = useWallets()

  console.log("[v0] AnalyticsPage - ready:", ready, "authenticated:", authenticated)
  console.log("[v0] AnalyticsPage - wallets:", wallets)

  if (!ready) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">거래 내역을 분석하려면 먼저 지갑을 연결해야 합니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const wallet = wallets[0]
  if (!wallet?.address) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">지갑 주소를 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">거래 내역 분석</h1>
        <p className="text-muted-foreground mt-2">
          지갑 주소: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
        </p>
      </div>

      <TransactionAnalytics address={wallet.address} />
    </div>
  )
}
