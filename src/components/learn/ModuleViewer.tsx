"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  Code,
  HelpCircle,
} from "lucide-react";
import { Module } from "@/data/modules";
import { cn } from "@/lib/utils";

interface ModuleContent {
  overview: string;
  keyPoints: string[];
  codeExample?: { language: string; title: string; code: string };
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

interface ModuleViewerProps {
  module: Module;
  content?: ModuleContent;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ModuleViewer({
  module,
  content,
  isCompleted,
  onComplete,
  onBack,
  onNext,
}: ModuleViewerProps) {
  const [activeSection, setActiveSection] = useState<"content" | "code" | "quiz">("content");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const allCorrect =
    content?.quiz?.every((q, i) => quizAnswers[i] === q.correct) ?? false;

  // Default content for modules that don't have detailed content yet
  const fallbackContent: ModuleContent = {
    overview: `This module covers: ${module.description}. Content for this module is being developed and will include interactive examples, code walkthroughs, and practice exercises.\n\nTopics covered:\n${module.topics.map((t) => `- ${t}`).join("\n")}`,
    keyPoints: module.topics,
  };

  const displayContent = content || fallbackContent;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-surface-800 text-surface-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-surface-500 mb-1">
            <span>Module {module.id}</span>
            <span>|</span>
            <span>{module.section}</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {module.duration}
            </span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full",
                module.difficulty === "beginner" && "bg-accent-950/50 text-accent-400",
                module.difficulty === "intermediate" && "bg-amber-950/50 text-amber-400",
                module.difficulty === "advanced" && "bg-rose-950/50 text-rose-400"
              )}
            >
              {module.difficulty}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">{module.title}</h1>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-accent-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        )}
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1 mb-6 border-b border-surface-800 pb-2">
        <button
          onClick={() => setActiveSection("content")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors",
            activeSection === "content"
              ? "bg-primary-600/10 text-primary-400"
              : "text-surface-400 hover:text-white"
          )}
        >
          <BookOpen className="w-4 h-4" />
          Content
        </button>
        {displayContent.codeExample && (
          <button
            onClick={() => setActiveSection("code")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors",
              activeSection === "code"
                ? "bg-primary-600/10 text-primary-400"
                : "text-surface-400 hover:text-white"
            )}
          >
            <Code className="w-4 h-4" />
            Code Example
          </button>
        )}
        {displayContent.quiz && (
          <button
            onClick={() => setActiveSection("quiz")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors",
              activeSection === "quiz"
                ? "bg-primary-600/10 text-primary-400"
                : "text-surface-400 hover:text-white"
            )}
          >
            <HelpCircle className="w-4 h-4" />
            Quiz
          </button>
        )}
      </div>

      {/* Content */}
      {activeSection === "content" && (
        <div className="space-y-8">
          {/* Overview */}
          <div className="prose prose-invert max-w-none">
            {displayContent.overview.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-surface-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Points */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {displayContent.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-surface-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Code Example */}
      {activeSection === "code" && displayContent.codeExample && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {displayContent.codeExample.title}
          </h3>
          <div className="rounded-xl overflow-hidden border border-surface-700">
            <div className="bg-surface-800 px-4 py-2 flex items-center justify-between border-b border-surface-700">
              <span className="text-xs text-surface-400 font-mono">
                {displayContent.codeExample.language}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(displayContent.codeExample!.code)}
                className="text-xs text-surface-500 hover:text-white transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="p-4 overflow-x-auto !rounded-none !border-0">
              <code className="text-sm text-surface-300 whitespace-pre">
                {displayContent.codeExample.code}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Quiz */}
      {activeSection === "quiz" && displayContent.quiz && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">
            Module Quiz
          </h3>
          {displayContent.quiz.map((q, qi) => (
            <div
              key={qi}
              className="p-5 rounded-xl border border-surface-800 bg-surface-900/50"
            >
              <p className="text-white font-medium mb-4">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isSelected = quizAnswers[qi] === oi;
                  const isCorrect = oi === q.correct;
                  const showResult = quizSubmitted;

                  return (
                    <button
                      key={oi}
                      onClick={() => {
                        if (!quizSubmitted) {
                          setQuizAnswers((prev) => ({ ...prev, [qi]: oi }));
                        }
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border text-sm transition-colors",
                        !showResult && isSelected
                          ? "border-primary-500 bg-primary-950/30 text-white"
                          : !showResult
                          ? "border-surface-700 hover:border-surface-600 text-surface-300"
                          : showResult && isCorrect
                          ? "border-accent-500 bg-accent-950/30 text-accent-300"
                          : showResult && isSelected && !isCorrect
                          ? "border-red-500 bg-red-950/30 text-red-300"
                          : "border-surface-700 text-surface-500"
                      )}
                      disabled={quizSubmitted}
                    >
                      <span className="font-mono text-xs mr-2">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {quizSubmitted && (
                <div
                  className={cn(
                    "mt-4 p-3 rounded-lg text-sm",
                    quizAnswers[qi] === q.correct
                      ? "bg-accent-950/30 border border-accent-800/30 text-accent-300"
                      : "bg-red-950/30 border border-red-800/30 text-red-300"
                  )}
                >
                  {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length !== displayContent.quiz.length}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-surface-700 disabled:text-surface-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="p-4 rounded-lg border border-surface-800 bg-surface-900/50">
              <p className="text-white font-medium">
                Score: {displayContent.quiz.filter((q, i) => quizAnswers[i] === q.correct).length} / {displayContent.quiz.length}
              </p>
              {allCorrect && (
                <p className="text-accent-400 text-sm mt-1">
                  All correct! Great work.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-surface-800">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
        >
          Back to Modules
        </button>
        <div className="flex items-center gap-3">
          {!isCompleted && (
            <button
              onClick={() => {
                onComplete();
              }}
              className="px-5 py-2.5 text-sm font-medium bg-accent-600 hover:bg-accent-500 text-white rounded-lg transition-colors"
            >
              Mark Complete
            </button>
          )}
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
          >
            Next Module
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
