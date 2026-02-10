import {
  BookOpen,
  Bot,
  Rocket,
  Shield,
  Brain,
  BarChart3,
  Code2,
  Wallet,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "47-Module Curriculum",
    description:
      "From prediction market basics to advanced ML-powered bots. 6 sections covering fundamentals, strategies, development, and security.",
    color: "text-primary-400",
    bg: "bg-primary-950/50",
  },
  {
    icon: Bot,
    title: "Mock Bot Simulator",
    description:
      "$10,000 in mock USDC to build, test, and iterate on your bots. Real market data, simulated execution, zero risk.",
    color: "text-accent-400",
    bg: "bg-accent-950/50",
  },
  {
    icon: Brain,
    title: "AI Trading Coach",
    description:
      "Get real-time feedback on your bot's code, strategy parameters, and risk management. Prevents dangerous configurations.",
    color: "text-amber-400",
    bg: "bg-amber-950/50",
  },
  {
    icon: Code2,
    title: "Code + No-Code Builder",
    description:
      "Write Python/JS code with guidance or use our visual drag-and-drop bot builder. Both paths lead to production-ready bots.",
    color: "text-cyan-400",
    bg: "bg-cyan-950/50",
  },
  {
    icon: BarChart3,
    title: "Strategy Backtesting",
    description:
      "Test your bot against 30+ days of historical data. See win rates, Sharpe ratios, drawdowns, and profit factors before risking real money.",
    color: "text-rose-400",
    bg: "bg-rose-950/50",
  },
  {
    icon: Rocket,
    title: "Guided Deployment",
    description:
      "Step-by-step wizard for wallet setup, API configuration, funding, and going live. Security checkpoints at every stage.",
    color: "text-violet-400",
    bg: "bg-violet-950/50",
  },
  {
    icon: Shield,
    title: "Security-First Approach",
    description:
      "6 dedicated security modules. Key management, code auditing, operational security, and financial risk management built in.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/50",
  },
  {
    icon: Wallet,
    title: "5+ Bot Strategies",
    description:
      "Arbitrage, market making, momentum, news trading, copy trading, and more. Each with full code implementations.",
    color: "text-orange-400",
    bg: "bg-orange-950/50",
  },
  {
    icon: MessageSquare,
    title: "Community & Support",
    description:
      "Share strategies, compare bot performance, get code reviews, and compete in monthly strategy competitions.",
    color: "text-pink-400",
    bg: "bg-pink-950/50",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to Build Trading Bots
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            A complete platform for learning, building, testing, and deploying
            Polymarket trading bots — from first lesson to first profitable trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-surface-800 hover:border-surface-700 bg-surface-900/50 hover:bg-surface-900 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
