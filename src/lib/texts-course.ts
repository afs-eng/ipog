import type { DevelopmentCourseSection } from "./development-course";
import { textsUnits } from "./texts-units";

export const textsCourseSections: DevelopmentCourseSection[] = textsUnits.map((unit) => ({
  id: unit.slug.replace("producao-interpretacao-textos-", ""),
  title: unit.title,
  description: unit.videoDescription,
  imageUrl: "/window.svg",
  lessons: [
    {
      title: unit.title,
      description: unit.testDescription,
      materialSlug: unit.slug,
      topicSlug: unit.slug,
    },
  ],
}));
