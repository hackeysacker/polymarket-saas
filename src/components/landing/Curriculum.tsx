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
  Clock,
  Lock,
} from "lucide-react";
import { sections, modules } from "@/data/modules";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  TrendingUp,
  Code,
  Bot,
  Cpu,
  Shield,
};

export default function Curriculum() {
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Complete 47-Module Curriculum
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            Six comprehensive sections taking you from prediction market basics
            to production bot deployment and security.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const Icon = iconMap[section.icon] || BookOpen;
            const sectionModules = modules.filter(
              (m) => m.sectionNumber === section.number
            );
            const isExpanded = expandedSection === section.number;

            return (
              <div
                key={section.number}
                className="rounded-xl border border-surface-800 overflow-hidden bg-surface-900/30"
              >
                <button
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-800/50 transition-colors"
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
                        {section.moduleCount} modules
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{section.title}</h3>
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
                      {sectionModules.map((mod) => (
                        <div
                          key={mod.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-800/50 transition-colors"
                        >
                          <span className="text-xs text-surface-500 font-mono w-6 text-right shrink-0">
                            {mod.id}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white font-medium truncate">
                              {mod.title}
                            </div>
                            <div className="text-xs text-surface-500 truncate">
                              {mod.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1 text-xs text-surface-500">
                              <Clock className="w-3 h-3" />
                              {mod.duration}
                            </div>
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
