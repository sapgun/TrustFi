import TrustScoreDisplay from "@/components/app/TrustScoreDisplay"
import TrustNFTManager from "@/components/nft/TrustNFTManager"

export default function TrustScorePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Trust Score Details</h1>
      <TrustScoreDisplay />
      <TrustNFTManager />
    </div>
  )
}
