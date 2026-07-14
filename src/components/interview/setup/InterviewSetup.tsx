import SubjectSelector from "./SubjectSelector";
import DifficultySelector from "./DifficultySelector";
import QuestionCountSelector from "./QuestionCountSelector";
import { Button } from "@/components/ui/button";

interface InterviewSetupProps {
  onStart: () => void;
}

export default function InterviewSetup({
  onStart,
}: InterviewSetupProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold">
          AI Mock Interview
        </h1>

        <p className="text-gray-400 text-lg">
          Prepare for placements with company-style interview questions.
        </p>
      </div>

      <div className="glass rounded-3xl p-8 space-y-10">

        <SubjectSelector />

        <DifficultySelector />

        <QuestionCountSelector />

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="px-12 py-7 text-lg rounded-2xl"
            onClick={onStart}
          >
            Start Interview
          </Button>
        </div>

      </div>

    </div>
  );
}