import { useMemo } from "react";

import modernArch1 from '@/assets/modern-architecture-1.jpg'
import modernArch2 from '@/assets/modern-architecture-2.jpg'
import modernArch3 from '@/assets/modern-architecture-3.jpg'
import modernArch4 from '@/assets/modern-architecture-4.jpg'

export const projects = [
    {
      image: modernArch1,
      title: "Residência Moderna",
      description: "Projeto residencial contemporâneo",
      category: "Residencial",
    },
    {
      image: modernArch2,
      title: "Complexo Comercial",
      description: "Edifício corporativo moderno",
      category: "Comercial",
    },
    {
      image: modernArch3,
      title: "Villa de Luxo",
      description: "Residência de alto padrão",
      category: "Residencial",
    },
    {
      image: modernArch4,
      title: "Arquitectura Moderna",
      description: "Espaço comercial moderno e funcional",
      category: "Residencial",
    },
    {
      id: 1,
      title: "Casa Moderna Minimalista",
      description:
        "Uma residência contemporânea que combina linhas limpas com materiais naturais, criando um ambiente sofisticado e acolhedor.",
      category: "Residencial",
      image: "/placeholder.svg?height=300&width=400",
      createdAt: "2024-01-15",
      status: "published",
    },
    {
      id: 2,
      title: "Escritório Corporativo Tech",
      description:
        "Espaço de trabalho inovador para empresa de tecnologia com áreas colaborativas e design futurista.",
      category: "Comercial",
      image: "/placeholder.svg?height=300&width=400",
      createdAt: "2024-01-10",
      status: "published",
    },
    {
      id: 3,
      title: "Loft Industrial Convertido",
      description:
        "Transformação de antigo galpão industrial em loft residencial moderno com elementos industriais preservados.",
      category: "Residencial",
      image: "/placeholder.svg?height=300&width=400",
      createdAt: "2024-01-05",
      status: "draft",
    },
    {
      id: 4,
      title: "Centro Médico Integrado",
      description:
        "Complexo médico com foco no bem-estar dos pacientes e eficiência operacional.",
      category: "Institucional",
      image: "/placeholder.svg?height=300&width=400",
      createdAt: "2023-12-20",
      status: "published",
    }
  ]
