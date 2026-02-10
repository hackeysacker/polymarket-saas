import { Activity, AlertTriangle, CheckCircle } from "lucide-react";

export default function SimulatorPreview() {
  return (
    <section className="py-24 relative bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Practice with Zero Risk
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            Our mock simulator uses real Polymarket data with $10,000 in virtual
            USDC. Build your bot, test strategies, and learn from mistakes
            without risking a penny.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Simulator mockup */}
          <div className="rounded-xl overflow-hidden border border-surface-700 shadow-2xl shadow-black/40">
            {/* Title bar */}
            <div className="bg-surface-800 px-4 py-2.5 flex items-center gap-2 border-b border-surface-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-surface-400 ml-2 font-mono">
                Bot Simulator - ArbitrageBot_v1
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Running</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-surface-900 p-6">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500 mb-1">Balance</div>
                  <div className="text-lg font-bold text-white">$10,047.30</div>
                  <div className="text-xs text-green-400">+$47.30 today</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500 mb-1">Win Rate</div>
                  <div className="text-lg font-bold text-white">64.7%</div>
                  <div className="text-xs text-surface-400">22W / 12L</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500 mb-1">Trades</div>
                  <div className="text-lg font-bold text-white">34</div>
                  <div className="text-xs text-surface-400">Avg $3.42/trade</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500 mb-1">Uptime</div>
                  <div className="text-lg font-bold text-white">2h 34m</div>
                  <div className="text-xs text-surface-400">45 markets</div>
                </div>
              </div>

              {/* Recent trades */}
              <div className="space-y-3">
                <div className="text-xs text-surface-500 uppercase tracking-wider font-medium">
                  Recent Trades
                </div>

                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      &quot;Will Bitcoin hit $150k by March 2026?&quot;
                    </div>
                    <div className="text-xs text-surface-400">
                      Arb: YES $0.485 + NO $0.482 = $0.97
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm text-green-400 font-medium">
                      +$1.65
                    </div>
                    <div className="text-xs text-surface-500">3 min ago</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      &quot;Will Fed cut rates in March?&quot;
                    </div>
                    <div className="text-xs text-surface-400">
                      Arb: YES $0.48 + NO $0.48 = $0.96
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm text-green-400 font-medium">
                      +$3.00
                    </div>
                    <div className="text-xs text-surface-500">18 min ago</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700 flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      &quot;Super Bowl winner: Chiefs or Eagles?&quot;
                    </div>
                    <div className="text-xs text-surface-400">
                      Failed: Insufficient liquidity, partial fill
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm text-red-400 font-medium">
                      -$0.30
                    </div>
                    <div className="text-xs text-surface-500">12 min ago</div>
                  </div>
                </div>
              </div>

              {/* AI Coach hint */}
              <div className="mt-4 p-3 rounded-lg bg-primary-950/30 border border-primary-800/30">
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm text-primary-300 font-medium">
                      AI Coach
                    </div>
                    <div className="text-xs text-surface-400 mt-1">
                      &quot;Trade #032 failed due to low liquidity. Add a liquidity
                      filter: <code className="text-primary-400">if market[&apos;volume&apos;] &gt; 50000</code> to
                      avoid thin markets. Your bot otherwise looks great!&quot;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
