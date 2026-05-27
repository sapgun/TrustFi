import SecureSendTransaction from "@/components/wallet/SecureSendTransaction"

export default function TransactionsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">거래</h1>
      <SecureSendTransaction />
    </div>
  )
}
