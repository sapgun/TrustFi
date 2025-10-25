'use client';

import { useEffect, useState } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { getCachedTrustScore, TrustScoreBreakdown } from '@/lib/trust-score/calculator';

export default function TrustScoreDisplay() {
  const { wallets } = useWallets();
  const [score, setScore] = useState<TrustScoreBreakdown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScore() {
      if (!wallets[0]) return;

      const address = wallets[0].address;
      const trustScore = await getCachedTrustScore(address);

      setScore(trustScore);
      setLoading(false);
    }

    loadScore();
  }, [wallets]);

  if (loading) return <div>Loading Trust Score...</div>;

  if (!score) return <div>Could not load Trust Score.</div>;

  return (
    <div>
      <h2>Your Trust Score: {score.total}</h2>
      <ul>
        <li>Identity: {score.identity}/300</li>
        <li>On-chain: {score.onchain}/200</li>
        <li>Community: {score.community}/100</li>
        <li>Institutional: {score.institutional}/250</li>
        <li>Security: {score.security}/50</li>
      </ul>
    </div>
  );
}
