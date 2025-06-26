'use client'

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import laiserLogo from "@/assets/laisher-logo.png"

const quickLinks = [
  { href: "/", label: "Página inicial" },
  { href: "/about", label: "Sobre nós" },
  { href: "/services", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
]

const contactInfo = [
  {
    icon: Phone,
    text: "+258 84 123 4567",
  },
  {
    icon: Mail,
    text: "info@laisher.co.mz",
  },
  {
    icon: MapPin,
    text: "Maputo, Moçambique",
  },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950/95 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Image
              src={laiserLogo}
              alt="Laisher Logo"
              className="h-12 w-auto mb-4 opacity-80"
            />
            <p className="text-white mb-4">
              Especializados em Arquitectura e Engenharias. Contribuímos para
              concretizar os sonhos dos nossos clientes.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white hover:text-emerald-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2">
              {contactInfo.map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-white">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-600 mt-8 pt-8 text-center">
          <p className="text-white">
            © 2024 Laisher - Projectos e Serviços, Lda. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
