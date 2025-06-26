"use client";
import { CheckCircle, Target, Award, Users, Building2 } from "lucide-react";
import corporateTeam from "@/assets/corporate-team.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: "Integridade",
      description:
        "Atuamos com ética, transparência e honestidade em todas as nossas relações.",
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: "Inovação",
      description:
        "Buscamos constantemente novas ideias e tecnologias para oferecer as melhores soluções.",
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Excelência",
      description:
        "Comprometemo-nos com a mais alta qualidade em tudo o que fazemos, superando as expectativas.",
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Colaboração",
      description:
        "Acreditamos no poder do trabalho em equipe e na parceria com nossos clientes.",
    },
  ];

  const whyChooseUs = [
    "Experiência Comprovada: Anos de sucesso e um portfólio robusto de projetos bem-sucedidos.",
    "Soluções Personalizadas: Desenvolvemos abordagens sob medida para atender às suas necessidades específicas.",
    "Suporte Dedicado: Nossa equipe está sempre pronta para oferecer assistência e garantir sua satisfação.",
    "Tecnologia de Ponta: Utilizamos as ferramentas e metodologias mais avançadas do mercado.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nós</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Conheça a Laisher: sua parceira estratégica para soluções
              inovadoras e crescimento sustentável
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6 flex items-center">
                <Building2 className="w-8 h-8 text-emerald-600 mr-3" />
                Quem Somos
              </h2>
              <p className="text-lg text-black leading-relaxed mb-6">
                A Laisher é uma empresa líder em soluções inovadoras, dedicada a
                impulsionar o sucesso dos nossos clientes através de serviços de
                alta qualidade e tecnologia de ponta.
              </p>
              <p className="text-lg text-black leading-relaxed">
                Com anos de experiência no mercado, construímos uma reputação
                sólida baseada na excelência, confiança e compromisso com
                resultados.
              </p>
            </div>
            <div className="relative">
              <Image
                src={corporateTeam}
                alt="Equipe Laisher"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white shadow-lg border hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Nossa Missão
                </h3>
                <p className="text-black leading-relaxed">
                  Capacitar empresas e indivíduos com soluções estratégicas e
                  eficientes que otimizem suas operações, promovam o crescimento
                  sustentável e gerem valor duradouro para todas as partes
                  interessadas.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white shadow-lg border hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Nossa Visão
                </h3>
                <p className="text-black leading-relaxed">
                  Ser reconhecida como a parceira de escolha para inovação e
                  desenvolvimento, liderando a transformação digital e
                  estabelecendo novos padrões de excelência em nossos setores de
                  atuação.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Os princípios que guiam nossas ações e definem nossa cultura
              organizacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-black mb-3">
                    {value.title}
                  </h4>
                  <p className="text-black text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="bg-zinc-950/95 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Por Que Escolher a Laisher?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="text-white leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Estamos prontos para ser o seu parceiro estratégico. Entre em
              contato conosco hoje mesmo para saber como podemos ajudar sua
              empresa a prosperar.
            </p>
            <Link href="/contact">
              <Button
                className="bg-white text-emerald-700 hover:bg-slate-100  px-8 py-5"
              >
                Entre em Contato
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
