import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TrustPort - Web3 실명 인증의 게이트웨이",
  description: "PASS 기반 실명 인증부터 DID 생성, Web3 온체인 참여까지. 신뢰할 수 있는 디지털 신원의 새로운 표준",
  generator: "v0.dev",
  keywords: ["Web3", "실명인증", "PASS", "DID", "블록체인", "KYC", "DAO", "NFT"],
  authors: [{ name: "TrustPort Team" }],
  openGraph: {
    title: "TrustPort - Web3 실명 인증의 게이트웨이",
    description: "PASS 기반 실명 인증부터 DID 생성, Web3 온체인 참여까지. 신뢰할 수 있는 디지털 신원의 새로운 표준",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustPort - Web3 실명 인증의 게이트웨이",
    description: "PASS 기반 실명 인증부터 DID 생성, Web3 온체인 참여까지",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#00C2A8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
