"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import Link from "next/link"

export default function Projects() {
    return(
        <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nossos Projectos</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Conheça alguns dos nossos trabalhos que demonstram nossa excelência em arquitetura e engenharia.
          </p>
        </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-medium text-emerald-300 mb-1">{project.description}</div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="bg-white text-gray-900 border-gray-300">
            <Link href="/portfolio">Ver Portfolio Completo</Link>
          </Button>
        </div>
      </div>
    </section>
    )
}