'use client'

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import laiserLogo from "../assets/laisher-logo.png"
import { X, Menu } from "lucide-react"
import { Button } from "./ui/button"

const navLinks = [
  { href: "/", label: "Página inicial" },
  { href: "/about", label: "Sobre nós" },
  { href: "/services", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/contact", label: "Contactos" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `font-medium transition-colors ${
      pathname === href
        ? "text-emerald-600"
        : "text-black hover:text-emerald-600"
    }`

  return (
    <header className="bg-white border-b sticky top-0 z-50" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={laiserLogo} alt="Laisher Logo" className="h-16 w-auto" />
          </Link>

          {/* Navegação em telas grandes */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contact">
          <Button className="hidden md:flex bg-emerald-600 hover:bg-emerald-500 py-5 px-8">Contactar</Button>
          </Link>

          {/* Botão do menu móvel */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navegação móvel */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={linkClass(href)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
