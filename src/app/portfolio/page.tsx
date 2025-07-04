'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/types/types'
import { useEffect, useState } from 'react'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Erro ao buscar projetos')
        const data = await res.json()

        const publishedProjects = data.filter(
        (project: Project) => project.status === "published"
      )


        setProjects(publishedProjects)
      } catch (err) {
        console.error('Erro ao buscar projetos:', err)
      }
    }

    fetchProjects()
  }, [])
  

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
                      <div
                        key={project.id || index}
                        className="group relative overflow-hidden rounded-lg shadow-lg"
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                          
                          <p className="text-sm font-medium text-emerald-300 mt-1 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            {project.description}
                          </p>
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