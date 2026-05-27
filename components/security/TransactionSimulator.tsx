"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import {
  simulateTransaction,
  analyzeSecurityRisks,
  formatAssetChanges,
  type SimulateTransactionParams,
  type SecurityAnalysis,
} from "@/lib/alchemy/transaction-simulator"

interface TransactionSimulatorProps {
  transaction: SimulateTransactionParams
  userAddress: string
  chainId?: number
  onApprove?: () => void
  onReject?: () => void
}

export function TransactionSimulator({
  transaction,
  userAddress,
  chainId = 1,
  onApprove,
  onReject,
}: TransactionSimulatorProps) {
  const [analysis, setAnalysis] = useState<SecurityAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await simulateTransaction(transaction, chainId)
      const securityAnalysis = analyzeSecurityRisks(result, userAddress)
      setAnalysis(securityAnalysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level: SecurityAnalysis["riskLevel"]): "default" | "secondary" | "destructive" => {
    switch (level) {
      case "LOW":
        return "default"
      case "MEDIUM":
        return "secondary"
      case "HIGH":
      case "CRITICAL":
        return "destructive"
    }
  }

  const getRiskIcon = (level: SecurityAnalysis["riskLevel"]) => {
    switch (level) {
      case "LOW":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "MEDIUM":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "HIGH":
      case "CRITICAL":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Transaction Security Check</h3>
      </div>

      {!analysis && !error && (
        <Button onClick={handleSimulate} disabled={loading} className="w-full">
          {loading ? "Simulating..." : "Simulate Transaction"}
        </Button>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Simulation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {getRiskIcon(analysis.riskLevel)}
            <Badge variant={getRiskColor(analysis.riskLevel)}>{analysis.riskLevel} RISK</Badge>
          </div>

          <Alert>
            <AlertTitle>Summary</AlertTitle>
            <AlertDescription>{analysis.summary}</AlertDescription>
          </Alert>

          {analysis.warnings.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">⚠️ Warnings</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.warnings.map((warning, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">💡 Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Asset Changes</h4>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
              {formatAssetChanges(analysis.changes)}
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={onApprove} disabled={analysis.riskLevel === "CRITICAL"} className="flex-1">
              Approve Transaction
            </Button>
            <Button onClick={onReject} variant="outline" className="flex-1 bg-transparent">
              Reject
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
