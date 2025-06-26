"use client";
import { Building2, Target, Users, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: <Building2 className="w-12 h-12 text-emerald-600" />,
      title: "Projetos Arquitetônicos",
      description:
        "Desenvolvemos projetos arquitetônicos inovadores e funcionais, desde residências até complexos comerciais.",
      features: [
        "Design Conceitual",
        "Projetos Executivos",
        "Acompanhamento de Obra",
        "Licenciamento",
      ],
    },
    {
      icon: <Target className="w-12 h-12 text-emerald-600" />,
      title: "Engenharia Estrutural",
      description:
        "Soluções de engenharia estrutural seguras e eficientes para todos os tipos de construção.",
      features: [
        "Cálculo Estrutural",
        "Análise de Estabilidade",
        "Projetos de Fundação",
        "Inspeção Técnica",
      ],
    },
    {
      icon: <Users className="w-12 h-12 text-emerald-600" />,
      title: "Consultoria Técnica",
      description:
        "Assessoria especializada em todas as fases do seu projeto, garantindo qualidade e conformidade.",
      features: [
        "Análise de Viabilidade",
        "Consultoria Regulatória",
        "Avaliação Técnica",
        "Perícias",
      ],
    },
    {
      icon: <Award className="w-12 h-12 text-emerald-600" />,
      title: "Gestão de Projetos",
      description:
        "Gerenciamento completo de projetos, desde o planejamento até a entrega final.",
      features: [
        "Planejamento",
        "Coordenação",
        "Controle de Qualidade",
        "Entrega no Prazo",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Soluções completas em arquitetura e engenharia para transformar
              suas ideias em realidade
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-white shadow-lg border hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    {service.icon}
                    <h3 className="text-2xl font-bold text-black ml-4">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Precisa de Nossos Serviços?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para discutir seu projecto e descobrir
              como podemos ajudar
            </p>
            <Link href="/contacts">
              <Button
                className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-5"
              >
                Solicitar Orçamento
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
