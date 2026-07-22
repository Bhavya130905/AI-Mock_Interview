import { useState } from "react";
import SubjectSelector from "./SubjectSelector";
import DifficultySelector from "./DifficultySelector";
import QuestionCountSelector from "./QuestionCountSelector";
import { Button } from "@/components/ui/button";

export interface InterviewConfig {
  subject: string;
  difficulty: string;
  questionCount: number;
}

interface InterviewSetupProps {
  onStart: (config: InterviewConfig) => void;
}

export default function InterviewSetup({
  onStart,
}: InterviewSetupProps) {
  const [subject, setSubject] = useState("dsa");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);

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

        <SubjectSelector selected={subject} onSelect={setSubject} />

        <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

        <QuestionCountSelector selected={questionCount} onSelect={setQuestionCount} />

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="px-12 py-7 text-lg rounded-2xl"
            onClick={() => onStart({ subject, difficulty, questionCount })}
          >
            Start Interview
          </Button>
        </div>

      </div>

    </div>
  );
}
