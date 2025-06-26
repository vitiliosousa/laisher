import BackgroundCarousel from "@/components/BackgroundCarousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Link from "next/link"


export default function HeroSection() {
    return (
        <section className="relative py-20 text-white min-h-[80vh] flex items-center overflow-hidden">
        <BackgroundCarousel />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Especializados em<br />
                <span className="text-emerald-400">Arquitectura e</span><br />
                <span className="text-emerald-400">Engenharias</span>
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed">
                Contribuímos para concretizar os sonhos dos nossos clientes, com a melhor solução, 
                sempre acompanhada pelo nosso compromisso de criar projetos que permitam um impacto 
                positivo onde pessoas, edifícios e meio ambiente coexistam em equilíbrio.
              </p>
              <div className='flex gap-4'>
                <Link href="/services">
                <Button  className=" hover:bg-emerald-500 bg-emerald-600 text-white py-5 px-8">
                  Nossos Serviços
                </Button>
              </Link>
              <Link href="/about">
                <Button  className=" hover:bg-slate-200 bg-white text-black py-5 px-8">
                  Saiba mais
                </Button>
              </Link>
              </div>        
            </div>
            <div className="relative">
              <Card className="p-6 bg-black/80 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-0">
                  <Quote className="w-8 h-8 text-emerald-400 mb-4" />
                  <blockquote className="text-lg italic mb-4">"A arquitetura é uma expressão de valores."</blockquote>
                  <cite className="text-emerald-300 font-medium">— Norman Foster</cite>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    )
}