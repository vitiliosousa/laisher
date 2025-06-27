"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
export default function Clients() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Clientes
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Conheça algumas das instituições que confiaram em nosso trabalho.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          {clients.map((client, index) => (
            <Image
            key={index}
              src={client.image || "/placeholder.svg"}
              alt={client.title}
              width={150}
              height={150}
              className=" object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
