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
import FutureRoadmap from "@/components/landing/FutureRoadmap"
import CTA from "@/components/landing/CTA"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DemoSection />
      <ProofOfTrust />
      <Ecosystem />
      <Technology />
      <MultiLayerArchitecture />
      <Features />
      <Security />
      <PrivacyModel />
      <Partnership />
      <RewardLayer />
      <FutureRoadmap />
      <CTA />
    </main>
  )
}
