import type { CourseSection } from "../components/course-card";

export type DevelopmentCourseSection = CourseSection;

export const developmentCourseSections: DevelopmentCourseSection[] = [
  {
    id: "unidade-1",
    title: "Unidade 1 — Desenvolvimento infantil e escolar",
    description: "Do desenvolvimento dos primeiros anos às transformações cognitivas e motoras da idade escolar.",
    imageUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-1-desenvolvimento-motor.jpg",
    lessons: [
      {
        title: "Desenvolvimento de 0 a 11 anos",
        description: "Desenvolvimento físico, motor, linguístico e cognitivo, incluindo as características dos períodos de 0 a 2, 2 a 7 e 7 a 11 anos.",
        materialSlug: "desenvolvimento-anos-iniciais-escolares-unidade-1",
        topicSlug: "desenvolvimento-anos-iniciais-escolares-unidade-1",
      },
    ],
  },
  {
    id: "unidade-2",
    title: "Unidade 2 — Desenvolvimento cognitivo",
    description: "A inteligência e a construção do conhecimento na epistemologia genética de Jean Piaget.",
    imageUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-2-inteligencia-construtivismo.png",
    lessons: [
      {
        title: "Inteligência e epistemologia genética",
        description: "Sujeito e objeto, esquemas, assimilação, acomodação, equilibração e estágios do desenvolvimento cognitivo.",
        materialSlug: "desenvolvimento-anos-iniciais-escolares-unidade-2",
        topicSlug: "desenvolvimento-anos-iniciais-escolares-unidade-2",
      },
    ],
  },
  {
    id: "unidade-3",
    title: "Unidade 3 — Estágios, jogos e aprendizagem",
    description: "Estágios cognitivos, conservação, formas de jogo e implicações pedagógicas.",
    imageUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-3-conservacao.jpg",
    lessons: [
      {
        title: "Estágios do desenvolvimento e práticas pedagógicas",
        description: "Relações entre estágio cognitivo, conservação, jogos e participação ativa na aprendizagem.",
        materialSlug: "desenvolvimento-anos-iniciais-escolares-unidade-3",
        topicSlug: "desenvolvimento-anos-iniciais-escolares-unidade-3",
      },
    ],
  },
  {
    id: "unidade-4",
    title: "Unidade 4 — Vygotsky e Wallon",
    description: "Mediação, linguagem, afetividade e desenvolvimento integral em um laboratório interativo de aprendizagem.",
    imageUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-2-inteligencia-construtivismo.png",
    lessons: [
      {
        title: "Aprender com o outro e desenvolver por inteiro",
        description: "Cartões de revisão, associação de conceitos, percurso dos estágios de Wallon e 12 casos de sala de aula com feedback explicado.",
        href: "/disciplinas/desenvolvimento-anos-iniciais-escolares/unidade-4",
      },
    ],
  },
];
