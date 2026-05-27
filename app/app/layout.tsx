import type React from "react"
import { Providers } from "../providers"
import ClientLayout from "./ClientLayout"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ClientLayout>{children}</ClientLayout>
    </Providers>
  )
}
