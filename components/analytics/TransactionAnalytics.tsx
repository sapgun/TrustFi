"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { analyzeTransactionHistory } from "@/lib/analytics/transaction-analyzer"
import type { TransactionAnalytics as AnalyticsData } from "@/lib/analytics/transaction-analyzer"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, AlertTriangle, CheckCircle, Activity } from "lucide-react"

interface TransactionAnalyticsProps {
  address: string
}

export default function TransactionAnalyticsComponent({ address }: TransactionAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      console.log("[v0] TransactionAnalytics - loading for address:", address)
      setLoading(true)
      try {
        const data = await analyzeTransactionHistory(address)
        console.log("[v0] TransactionAnalytics - data:", data)
        setAnalytics(data)
      } catch (error) {
        console.error("[v0] TransactionAnalytics - error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      loadAnalytics()
    }
  }, [address])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">거래 내역을 불러올 수 없습니다.</p>
        </CardContent>
      </Card>
    )
  }

  const getRiskBadge = (score: number) => {
    if (score < 30) return <Badge className="bg-green-500">안전</Badge>
    if (score < 60) return <Badge className="bg-yellow-500">주의</Badge>
    return <Badge className="bg-red-500">위험</Badge>
  }

  return (
    <div className="space-y-6">
      {/* 거래 통계 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 거래</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              보낸 {analytics.sentTransactions} / 받은 {analytics.receivedTransactions}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 거래량</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVolume} ETH</div>
            <p className="text-xs text-muted-foreground">평균 {analytics.averageTransactionValue} ETH</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">위험 점수</CardTitle>
            {analytics.riskScore < 30 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.riskScore}/100</div>
            <div className="mt-2">{getRiskBadge(analytics.riskScore)}</div>
          </CardContent>
        </Card>
      </div>

      {/* 카테고리별 거래 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 거래</CardTitle>
          <CardDescription>거래 유형별 분포</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.transactionsByCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{category}</span>
                <Badge variant="secondary">{count}건</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 상위 수신자 */}
      {analytics.topRecipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5" />
              상위 수신자
            </CardTitle>
            <CardDescription>가장 많이 거래한 주소</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topRecipients.map((recipient, index) => (
                <div key={recipient.address} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="text-sm font-mono">
                      {recipient.address.slice(0, 6)}...{recipient.address.slice(-4)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{recipient.count}건</div>
                    <div className="text-xs text-muted-foreground">{recipient.volume} ETH</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 상위 발신자 */}
      {analytics.topSenders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownLeft className="h-5 w-5" />
              상위 발신자
            </CardTitle>
            <CardDescription>가장 많이 받은 주소</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topSenders.map((sender, index) => (
                <div key={sender.address} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="text-sm font-mono">
                      {sender.address.slice(0, 6)}...{sender.address.slice(-4)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{sender.count}건</div>
                    <div className="text-xs text-muted-foreground">{sender.volume} ETH</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI 인사이트 */}
      <Card>
        <CardHeader>
          <CardTitle>인사이트</CardTitle>
          <CardDescription>거래 패턴 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analytics.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
