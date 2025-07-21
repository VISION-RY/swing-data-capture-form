import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitle: string;
}

export const FormProgress = ({ currentSection, totalSections, sectionTitle }: FormProgressProps) => {
  const progress = (currentSection / totalSections) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-foreground">{sectionTitle}</h2>
        <span className="text-sm text-muted-foreground">
          Section {currentSection} of {totalSections}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};