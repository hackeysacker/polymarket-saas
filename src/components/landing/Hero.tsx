import Link from "next/link";
import {
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-950/50 via-surface-950 to-surface-950" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-950/50 border border-primary-800/30 text-primary-300 text-sm mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>$40M+ earned by Polymarket arbitrageurs in 2024-2025</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Learn to Build</span>
            <br />
            <span className="gradient-text">Profitable Trading Bots</span>
            <br />
            <span className="text-white">for Polymarket</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Go from zero to deployed bot. Master prediction markets, build
            strategies in a risk-free sandbox, then deploy with AI-guided
            confidence. No prior crypto or coding experience needed.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl shadow-lg shadow-primary-600/25 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
            >
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-surface-300 hover:text-white bg-surface-800/50 hover:bg-surface-800 border border-surface-700 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              View Demo Dashboard
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "47", label: "Learning Modules" },
              { value: "$10k", label: "Mock USDC to Practice" },
              { value: "5+", label: "Bot Strategies" },
              { value: "24/7", label: "AI Coaching" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock terminal preview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-surface-700 shadow-2xl shadow-black/40">
            <div className="bg-surface-800 px-4 py-2.5 flex items-center gap-2 border-b border-surface-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-surface-400 ml-2 font-mono">
                polymarket-bot-academy ~ simulator
              </span>
            </div>
            <div className="bg-surface-900 p-6 font-mono text-sm leading-relaxed">
              <div className="text-accent-400">
                $ python arbitrage_bot.py --mode=simulator
              </div>
              <div className="text-surface-400 mt-2">
                [INFO] ArbitrageBot starting...
              </div>
              <div className="text-surface-400">
                [INFO] Config: $100/trade, 2.5% min profit
              </div>
              <div className="text-surface-400">
                [INFO] Scanning 156 active markets...
              </div>
              <div className="text-accent-400 mt-2">
                [INFO] Found 3 opportunities!
              </div>
              <div className="text-white">
                [INFO] Best: &quot;Will Fed cut rates in March?&quot; - 3.09% profit
              </div>
              <div className="text-surface-400">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; YES: $0.48 + NO: $0.49 = $0.97 (spread: $0.03)
              </div>
              <div className="text-accent-400 mt-2">
                [TRADE] Executing arbitrage on both sides...
              </div>
              <div className="text-green-400">
                [SUCCESS] Trade #1 complete! Profit: +$3.09 (3.09%)
              </div>
              <div className="text-surface-500 mt-2">
                [INFO] Total P&amp;L: +$3.09 | Win Rate: 100% | Trades: 1
              </div>
              <div className="text-surface-500">
                [INFO] Next scan in 30 seconds...
              </div>
              <div className="inline-block w-2 h-4 bg-accent-400 animate-pulse ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
