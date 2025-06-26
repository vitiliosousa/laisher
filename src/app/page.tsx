'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Projects from '@/components/Projects'
import HeroSection from '@/components/HeroSection'
import Services from '@/components/Services'

export default function HomePage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Hero Section */}
      <HeroSection/>
      {/* Projects Section */}
      <Projects/>

      {/* Services Preview */}
      <Services/>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar seu Projeto?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos transformar suas ideias em projetos excepcionais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  className="bg-white text-emerald-700 hover:bg-slate-100  px-8 py-5"
                >
                  Entre em Contato
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  className="border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-5"
                >
                  Conheça Nossa Empresa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
