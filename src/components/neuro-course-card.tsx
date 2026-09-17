import { CourseCard } from "@/components/course-card";
import type { NeuroCourseSection } from "@/lib/neuro-course";

type NeuroCourseCardProps = {
  section: NeuroCourseSection;
  answeredCount?: number;
};

export function NeuroCourseCard({ section, answeredCount = 0 }: NeuroCourseCardProps) {
  return <CourseCard answeredCount={answeredCount} quizId="neuroanatomofisiologia-treino-textual" section={section} />;
}
