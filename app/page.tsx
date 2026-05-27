import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import DemoSection from "@/components/landing/DemoSection"
import ProofOfTrust from "@/components/landing/ProofOfTrust"
import Ecosystem from "@/components/landing/Ecosystem"
import Technology from "@/components/landing/Technology"
import MultiLayerArchitecture from "@/components/landing/MultiLayerArchitecture"
import Features from "@/components/landing/Features"
import Security from "@/components/landing/Security"
import PrivacyModel from "@/components/landing/PrivacyModel"
import Partnership from "@/components/landing/Partnership"
import RewardLayer from "@/components/landing/RewardLayer"
import TrustPointSystem from "@/components/landing/TrustPointSystem"
import PoolLineup from "@/components/landing/PoolLineup"
import FutureRoadmap from "@/components/landing/FutureRoadmap"
import CTA from "@/components/landing/CTA"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="demo">
        <DemoSection />
      </div>
      <div id="proof-of-trust">
        <ProofOfTrust />
      </div>
      <div id="ecosystem">
        <Ecosystem />
      </div>
      <div id="technology">
        <Technology />
      </div>
      <div id="multi-layer">
        <MultiLayerArchitecture />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="security">
        <Security />
      </div>
      <div id="privacy">
        <PrivacyModel />
      </div>
      <div id="partnership">
        <Partnership />
      </div>
      <div id="rewards">
        <RewardLayer />
      </div>
      <div id="trust-points">
        <TrustPointSystem />
      </div>
      <div id="pools">
        <PoolLineup />
      </div>
      <div id="roadmap">
        <FutureRoadmap />
      </div>
      <CTA />
    </main>
  )
}
