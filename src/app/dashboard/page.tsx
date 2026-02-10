"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { BookOpen, Wrench, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import LearnTab from "@/components/learn/LearnTab";
import PracticeTab from "@/components/practice/PracticeTab";
import CreateTab from "@/components/create/CreateTab";

const tabs = [
  { id: "learn", label: "LEARN", icon: BookOpen, description: "47 Modules" },
  { id: "practice", label: "PRACTICE", icon: Wrench, description: "Mock Simulator" },
  { id: "create", label: "CREATE", icon: Rocket, description: "Deploy Bot" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("learn");

  return (
    <div className="min-h-screen bg-surface-950">
      <Header />
      <div className="pt-16">
        {/* Tab Navigation */}
        <div className="border-b border-surface-800 bg-surface-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary-600/10 text-primary-400 border border-primary-600/20"
                      : "text-surface-400 hover:text-white hover:bg-surface-800/50"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded",
                      activeTab === tab.id
                        ? "bg-primary-600/20 text-primary-300"
                        : "bg-surface-800 text-surface-500"
                    )}
                  >
                    {tab.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "learn" && <LearnTab />}
          {activeTab === "practice" && <PracticeTab />}
          {activeTab === "create" && <CreateTab />}
        </div>
      </div>
    </div>
  );
}
