'use client'

import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hiddenRoutes = ["/admin", "/admin/login"]
  const hideHeaderFooter = hiddenRoutes.includes(pathname)

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
