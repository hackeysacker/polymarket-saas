"use client";

import { useState } from "react";
import {
  BookOpen,
  TrendingUp,
  Code,
  Bot,
  Cpu,
  Shield,
  ChevronDown,
  ChevronRight,
  Clock,
  Lock,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { sections, modules, moduleContent } from "@/data/modules";
import { cn } from "@/lib/utils";
import ModuleViewer from "./ModuleViewer";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  TrendingUp,
  Code,
  Bot,
  Cpu,
  Shield,
};

export default function LearnTab() {
  const [expandedSection, setExpandedSection] = useState<number | null>(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(
    new Set()
  );

  const completeModule = (id: number) => {
    setCompletedModules((prev) => new Set([...Array.from(prev), id]));
  };

  if (selectedModule !== null) {
    const mod = modules.find((m) => m.id === selectedModule);
    if (mod) {
      return (
        <ModuleViewer
          module={mod}
          content={moduleContent[mod.id]}
          isCompleted={completedModules.has(mod.id)}
          onComplete={() => completeModule(mod.id)}
          onBack={() => setSelectedModule(null)}
          onNext={() => {
            const nextId = mod.id + 1;
            if (modules.find((m) => m.id === nextId)) {
              setSelectedModule(nextId);
            } else {
              setSelectedModule(null);
            }
          }}
        />
      );
    }
  }

  const totalCompleted = completedModules.size;
  const totalModules = modules.length;
  const progressPercent = Math.round((totalCompleted / totalModules) * 100);

  return (
    <div>
      {/* Progress Header */}
      <div className="mb-8 p-6 rounded-xl border border-surface-800 bg-surface-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Your Learning Path</h2>
            <p className="text-sm text-surface-400 mt-1">
              Master prediction markets and bot development in 47 modules
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-surface-300">
              <span className="text-white font-bold">{totalCompleted}</span> / {totalModules} completed
            </span>
          </div>
        </div>
        <div className="w-full bg-surface-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-surface-500 mt-2">{progressPercent}% complete</div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = iconMap[section.icon] || BookOpen;
          const sectionModules = modules.filter(
            (m) => m.sectionNumber === section.number
          );
          const sectionCompleted = sectionModules.filter((m) =>
            completedModules.has(m.id)
          ).length;
          const isExpanded = expandedSection === section.number;

          return (
            <div
              key={section.number}
              className="rounded-xl border border-surface-800 overflow-hidden bg-surface-900/30"
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-800/30 transition-colors"
                onClick={() =>
                  setExpandedSection(isExpanded ? null : section.number)
                }
              >
                <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-surface-500 font-medium">
                      SECTION {section.number}
                    </span>
                    <span className="text-xs text-surface-600">
                      {sectionCompleted}/{section.moduleCount} done
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">{section.title}</h3>
                </div>
                {/* Section progress */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <div className="w-20 bg-surface-800 rounded-full h-1.5">
                    <div
                      className="bg-accent-500 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${(sectionCompleted / section.moduleCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-surface-400 transition-transform shrink-0",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-surface-800">
                  <p className="text-sm text-surface-400 py-3">
                    {section.description}
                  </p>
                  <div className="space-y-1">
                    {sectionModules.map((mod) => {
                      const isComplete = completedModules.has(mod.id);

                      return (
                        <button
                          key={mod.id}
                          onClick={() => setSelectedModule(mod.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-800/50 transition-colors text-left"
                        >
                          <div className="shrink-0">
                            {isComplete ? (
                              <CheckCircle className="w-5 h-5 text-accent-400" />
                            ) : (
                              <span className="w-5 h-5 rounded-full border border-surface-600 flex items-center justify-center text-xs text-surface-500">
                                {mod.id}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                "text-sm font-medium truncate",
                                isComplete ? "text-surface-400" : "text-white"
                              )}
                            >
                              {mod.title}
                            </div>
                            <div className="text-xs text-surface-500 truncate">
                              {mod.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="flex items-center gap-1 text-xs text-surface-500">
                              <Clock className="w-3 h-3" />
                              {mod.duration}
                            </span>
                            {!mod.isFree && (
                              <Lock className="w-3 h-3 text-surface-600" />
                            )}
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                mod.difficulty === "beginner" &&
                                  "bg-accent-950/50 text-accent-400",
                                mod.difficulty === "intermediate" &&
                                  "bg-amber-950/50 text-amber-400",
                                mod.difficulty === "advanced" &&
                                  "bg-rose-950/50 text-rose-400"
                              )}
                            >
                              {mod.difficulty}
                            </span>
                            <ChevronRight className="w-4 h-4 text-surface-600" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
