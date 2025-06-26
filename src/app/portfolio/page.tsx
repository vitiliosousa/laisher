'use client'
import Image from 'next/image'
import modernArch1 from '@/assets/modern-architecture-1.jpg'
import modernArch2 from '@/assets/modern-architecture-2.jpg'
import modernArch3 from '@/assets/modern-architecture-3.jpg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/data/projects'

export default function PortfolioPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfólio</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Conheça nossos projetos e veja como transformamos ideias em realidade
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {projects.map((project, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {project.category}
                      </Badge>
                    </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <div className="text-sm font-medium text-emerald-300 mb-1">{project.description}</div>
                          <h3 className="text-xl font-bold">{project.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Gostou do nosso Trabalho?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Vamos conversar sobre seu próximo projecto e como podemos torná-lo realidade
            </p>
            <Link href="/contact">
              <Button
                className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-5"
              >
                Iniciar Projecto
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}