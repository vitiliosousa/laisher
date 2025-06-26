import Link from "next/link"
import { Building2, Target, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Services() {
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Arquitetura",
      desc: "Projetos arquitetônicos inovadores",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Engenharia",
      desc: "Soluções de engenharia estrutural",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultoria",
      desc: "Assessoria técnica especializada",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Gestão",
      desc: "Gerenciamento de projetos",
    },
  ]

  return (
    <section className="py-20 bg-zinc-950/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Nossos Serviços</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Oferecemos soluções completas em arquitetura e engenharia para transformar suas ideias em realidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon, title, desc }, index) => (
            <Card
              key={index}
              className="p-6 bg-zinc-900 border border-zinc-700/60 text-center hover:border-emerald-600 hover:shadow-md transition duration-300"
            >
              <CardContent className="p-0">
                <div className="flex justify-center mb-4 text-emerald-400">{icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
                <p className="text-white text-sm">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-5"
            >
              Ver Todos os Serviços
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
