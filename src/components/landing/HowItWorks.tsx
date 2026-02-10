import { BookOpen, Wrench, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "LEARN",
    subtitle: "Master the Fundamentals",
    description:
      "Work through 47 interactive modules covering prediction markets, trading strategies, bot development, and security. Go from complete beginner to confident bot builder.",
    highlights: [
      "Polymarket mechanics and trading",
      "5+ automated trading strategies",
      "Python/JavaScript bot development",
      "API authentication and security",
    ],
    color: "primary",
  },
  {
    number: "02",
    icon: Wrench,
    title: "PRACTICE",
    subtitle: "Build and Test Risk-Free",
    description:
      "Use $10,000 in mock USDC to build bots, test strategies, and learn from mistakes — all with real market data and zero financial risk. Backtest against historical data.",
    highlights: [
      "Full mock trading simulator",
      "Real-time market data",
      "Code editor with AI debugging",
      "Strategy backtesting engine",
    ],
    color: "accent",
  },
  {
    number: "03",
    icon: Rocket,
    title: "CREATE",
    subtitle: "Deploy with Confidence",
    description:
      "Follow our step-by-step deployment wizard with security checkpoints at every stage. From wallet setup to live trading, with AI coaching every step of the way.",
    highlights: [
      "Guided wallet & API setup",
      "Security verification checks",
      "Live bot monitoring dashboard",
      "Post-deployment AI coaching",
    ],
    color: "violet",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Steps to Your First Bot
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            A structured path from zero knowledge to a live, profitable trading
            bot. No shortcuts, no copy-paste — real understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="p-8 rounded-2xl border border-surface-800 bg-surface-900/30 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-black text-surface-800">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-surface-400">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-surface-300 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                <ul className="space-y-3 mt-auto">
                  {step.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-surface-300"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-primary-400 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10 w-8 h-8 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-surface-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
