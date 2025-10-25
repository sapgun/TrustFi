import TrustScoreDisplay from '@/components/trust-score/TrustScoreDisplay';

export default function TrustScorePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trust Score Details</h1>
      <TrustScoreDisplay />
    </div>
  );
}
