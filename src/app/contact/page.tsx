"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactos</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Entre em contato conosco e vamos discutir seu próximo projeto
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-8 text-center sm:text-start">Fale Conosco</h2>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center  md:items-start  gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-black">Telefone</h3>
                    <p className="text-black break-words">+258 84 123 4567</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-black">Email</h3>
                    <p className="text-black break-words">info@laisher.co.mz</p>
                    <p className="text-black break-words">projetos@laisher.co.mz</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-black">Endereço</h3>
                    <p className="text-black">Av. Julius Nyerere, 123</p>
                    <p className="text-black">Maputo, Moçambique</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-center mt-8 sm:text-left">
                <h3 className="font-semibold text-black mb-4">
                  Horário de Funcionamento
                </h3>
                <div className="space-y-2 text-black">
                  <p>Segunda - Sexta: 08:00 - 17:00</p>
                  <p>Sábado: 08:00 - 12:00</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6 sm:p-8 bg-white shadow-lg w-full">
              <CardContent className="p-0 w-full">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Envie uma Mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-black mb-2">
                        Nome *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-black mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-black mb-2">
                        Telefone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+258 84 123 4567"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-black mb-2">
                        Assunto *
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Selecionar um assunto"
                            defaultValue={formData.subject}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="projecto">Novo Projecto</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                          <SelectItem value="orcamento">Orçamento</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-black mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Descreva seu projeto ou dúvida..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-5"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
