"use client";

import { useState } from "react";
import {
  Play,
  Square,
  RefreshCw,
  Activity,
  BarChart3,
  Code2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Bot,
  Zap,
  Settings,
  Clock,
  DollarSign,
  Target,
} from "lucide-react";
import {
  defaultAccountStatus,
  defaultBotConfig,
  mockTrades,
  mockOpportunities,
  defaultBacktestResult,
  botCodeExample,
  strategies,
} from "@/data/simulator";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

type SubTab = "simulator" | "builder" | "backtest";

export default function PracticeTab() {
  const [subTab, setSubTab] = useState<SubTab>("simulator");
  const [botRunning, setBotRunning] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("arbitrage");
  const [showCode, setShowCode] = useState(false);

  const account = defaultAccountStatus;
  const bot = defaultBotConfig;
  const backtest = defaultBacktestResult;

  return (
    <div>
      {/* Sub-navigation */}
      <div className="flex gap-1 mb-6">
        {[
          { id: "simulator" as const, label: "Bot Simulator", icon: Activity },
          { id: "builder" as const, label: "Visual Bot Builder", icon: Settings },
          { id: "backtest" as const, label: "Backtesting", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors",
              subTab === tab.id
                ? "bg-accent-600/10 text-accent-400 border border-accent-600/20"
                : "text-surface-400 hover:text-white hover:bg-surface-800/50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Simulator */}
      {subTab === "simulator" && (
        <div className="space-y-6">
          {/* Account Status */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-400" />
                Mock Account
              </h2>
              <button
                className="text-xs text-surface-500 hover:text-white px-3 py-1 rounded-lg border border-surface-700 hover:border-surface-600 transition-colors"
              >
                <RefreshCw className="w-3 h-3 inline mr-1" />
                Reset Balance
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500 mb-1">Balance</div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(account.balance + account.pnlToday)}
                </div>
                <div className="text-xs text-green-400">
                  +{formatCurrency(account.pnlToday)} today
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500 mb-1">Win Rate</div>
                <div className="text-xl font-bold text-white">
                  {account.winRate}%
                </div>
                <div className="text-xs text-surface-400">
                  {account.wins}W / {account.losses}L
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500 mb-1">Trades</div>
                <div className="text-xl font-bold text-white">
                  {account.totalTrades}
                </div>
                <div className="text-xs text-surface-400">
                  Avg {formatCurrency(bot.avgProfitPerTrade)}/trade
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500 mb-1">Weekly P&L</div>
                <div className="text-xl font-bold text-green-400">
                  +{formatCurrency(account.pnlWeek)}
                </div>
                <div className="text-xs text-surface-400">
                  {formatPercent(account.pnlWeekPercent)}
                </div>
              </div>
            </div>
          </div>

          {/* Bot Controls */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      botRunning ? "bg-green-400 animate-pulse" : "bg-surface-500"
                    )}
                  />
                  {bot.name}
                  <span className="text-xs text-surface-500 font-normal">
                    ({bot.strategy})
                  </span>
                </h3>
                <p className="text-sm text-surface-400 mt-1">
                  Monitoring {bot.marketsMonitored} markets | {bot.opportunitiesFound} opportunities found (24h)
                </p>
              </div>
              <div className="flex items-center gap-2">
                {botRunning ? (
                  <button
                    onClick={() => setBotRunning(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-950/30 border border-red-800/30 rounded-lg hover:bg-red-950/50 transition-colors"
                  >
                    <Square className="w-3 h-3" />
                    Stop Bot
                  </button>
                ) : (
                  <button
                    onClick={() => setBotRunning(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-400 bg-green-950/30 border border-green-800/30 rounded-lg hover:bg-green-950/50 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Start Bot
                  </button>
                )}
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-400 bg-surface-800 border border-surface-700 rounded-lg hover:text-white transition-colors"
                >
                  <Code2 className="w-3 h-3" />
                  {showCode ? "Hide Code" : "View Code"}
                </button>
              </div>
            </div>

            {/* Code Editor */}
            {showCode && (
              <div className="mt-4 rounded-xl overflow-hidden border border-surface-700">
                <div className="bg-surface-800 px-4 py-2 flex items-center justify-between border-b border-surface-700">
                  <span className="text-xs text-surface-400 font-mono">
                    arbitrage_bot.py
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-surface-500 hover:text-white px-2 py-0.5 rounded border border-surface-700 transition-colors">
                      Copy
                    </button>
                    <button className="text-xs text-primary-400 hover:text-primary-300 px-2 py-0.5 rounded border border-primary-800/30 bg-primary-950/30 transition-colors">
                      Run in Simulator
                    </button>
                  </div>
                </div>
                <pre className="p-4 overflow-x-auto max-h-96 !rounded-none !border-0 text-xs">
                  <code className="text-surface-300 whitespace-pre">
                    {botCodeExample}
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Opportunities */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Current Opportunities
            </h3>
            <div className="space-y-3">
              {mockOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-lg bg-surface-800/50 border border-surface-700 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full shrink-0 mt-1 sm:mt-0",
                      opp.strength === "strong" && "bg-green-400",
                      opp.strength === "moderate" && "bg-yellow-400",
                      opp.strength === "weak" && "bg-red-400"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium">
                      {opp.market}
                    </div>
                    <div className="text-xs text-surface-400 mt-1">
                      YES ${opp.yesPrice.toFixed(2)} + NO ${opp.noPrice.toFixed(2)} = $
                      {opp.totalCost.toFixed(2)} | Vol: $
                      {(opp.volume / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        opp.profitPercent > 0 ? "text-green-400" : "text-red-400"
                      )}
                    >
                      {formatPercent(opp.profitPercent)}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded",
                        opp.strength === "strong" && "bg-green-950/50 text-green-400",
                        opp.strength === "moderate" && "bg-yellow-950/50 text-yellow-400",
                        opp.strength === "weak" && "bg-red-950/50 text-red-400"
                      )}
                    >
                      {opp.recommendation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h3 className="text-white font-semibold mb-4">Recent Trades</h3>
            <div className="space-y-3">
              {mockTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="p-4 rounded-lg bg-surface-800/50 border border-surface-700"
                >
                  <div className="flex items-center gap-3">
                    {trade.status === "won" && (
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    )}
                    {trade.status === "open" && (
                      <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    {trade.status === "failed" && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    {trade.status === "lost" && (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">
                        #{trade.id} - {trade.market}
                      </div>
                      <div className="text-xs text-surface-400 mt-0.5">
                        {trade.strategy} | {trade.action}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className={cn(
                          "text-sm font-medium",
                          trade.profit >= 0 ? "text-green-400" : "text-red-400"
                        )}
                      >
                        {trade.profit >= 0 ? "+" : ""}
                        {formatCurrency(trade.profit)}
                      </div>
                      <div className="text-xs text-surface-500">
                        {trade.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-surface-500 mt-2 pl-7">
                    {trade.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Coach */}
          <div className="p-6 rounded-xl border border-primary-800/30 bg-primary-950/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary-300 mb-2">
                  AI Debugging Assistant
                </div>
                <div className="text-sm text-surface-300 space-y-3">
                  <p>I&apos;m analyzing your bot&apos;s performance. Here&apos;s what I see:</p>

                  <div>
                    <div className="text-accent-400 text-xs font-medium mb-1">
                      WORKING WELL:
                    </div>
                    <ul className="text-xs text-surface-400 space-y-1">
                      <li>- Arbitrage detection logic is sound</li>
                      <li>- Position sizing is conservative ($100/trade)</li>
                      <li>- Error handling on API calls is good</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-amber-400 text-xs font-medium mb-1">
                      POTENTIAL ISSUES:
                    </div>
                    <ul className="text-xs text-surface-400 space-y-1">
                      <li>
                        - Not checking liquidity before executing (see Trade #032)
                      </li>
                      <li>
                        - 30-second delay is slow for arbitrage; consider 10s or WebSocket
                      </li>
                      <li>
                        - Add <code className="text-primary-400">if market[&apos;volume&apos;] &gt; 50000</code> filter
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Bot Builder */}
      {subTab === "builder" && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h2 className="text-lg font-bold text-white mb-2">
              Visual Bot Builder
            </h2>
            <p className="text-sm text-surface-400 mb-6">
              Create your trading bot by selecting components. No coding required.
            </p>

            {/* Step 1: Strategy */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-3">
                1. Select Strategy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strategies.map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => setSelectedStrategy(strat.id)}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-colors",
                      selectedStrategy === strat.id
                        ? "border-primary-500 bg-primary-950/30"
                        : "border-surface-700 hover:border-surface-600 bg-surface-800/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {strat.name}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          strat.difficulty === "Beginner" &&
                            "bg-accent-950/50 text-accent-400",
                          strat.difficulty === "Intermediate" &&
                            "bg-amber-950/50 text-amber-400",
                          strat.difficulty === "Advanced" &&
                            "bg-rose-950/50 text-rose-400"
                        )}
                      >
                        {strat.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-surface-400">{strat.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-surface-500">
                      <span>Return: {strat.expectedReturn}</span>
                      <span>Win rate: {strat.winRate}</span>
                      <span>{strat.risk}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Parameters */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-3">
                2. Configure Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Position Size per Trade
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type="number"
                      defaultValue={100}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-surface-500 mt-1">
                    Recommended: $50-200 for testing
                  </span>
                </div>

                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Minimum Profit Threshold
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type="number"
                      defaultValue={2.5}
                      step={0.5}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-surface-500 mt-1">
                    Minimum % profit to execute
                  </span>
                </div>

                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Max Concurrent Positions
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 px-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Daily Loss Limit
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Minimum Market Volume
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type="number"
                      defaultValue={50000}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-surface-400 mb-1.5">
                    Scan Interval (seconds)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Market categories */}
              <div className="mt-4">
                <label className="block text-xs text-surface-400 mb-2">
                  Markets to Trade
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Politics", "Sports", "Crypto", "Entertainment"].map(
                    (cat, i) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-700 bg-surface-800/50 cursor-pointer hover:border-surface-600 transition-colors"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={i < 2}
                          className="w-3.5 h-3.5 rounded border-surface-600 text-primary-600 focus:ring-primary-500 bg-surface-800"
                        />
                        <span className="text-sm text-surface-300">{cat}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-accent-600 hover:bg-accent-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Play className="w-4 h-4" />
                Run Simulation
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-surface-300 bg-surface-800 border border-surface-700 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Code2 className="w-4 h-4" />
                Export Code
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-surface-300 bg-surface-800 border border-surface-700 hover:text-white rounded-lg transition-colors">
                Save Template
              </button>
            </div>
          </div>

          {/* AI Coach */}
          <div className="p-6 rounded-xl border border-primary-800/30 bg-primary-950/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-400" />
              </div>
              <div className="text-sm text-surface-300">
                <span className="text-primary-300 font-medium">AI Coach: </span>
                &quot;Your {strategies.find((s) => s.id === selectedStrategy)?.name} bot looks good!
                $100 position size is conservative for testing. Consider starting with
                just Politics markets (most stable liquidity). Your parameters are sensible
                for a first run. Want to run a 30-day backtest with these settings?&quot;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backtesting */}
      {subTab === "backtest" && (
        <div className="space-y-6">
          {/* Config */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h2 className="text-lg font-bold text-white mb-4">
              Strategy Backtester
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs text-surface-400 mb-1.5">
                  Time Period
                </label>
                <select className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 px-3 text-sm text-white focus:border-primary-500 focus:outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 60 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1.5">
                  Markets
                </label>
                <select className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 px-3 text-sm text-white focus:border-primary-500 focus:outline-none">
                  <option>All Markets</option>
                  <option>Politics Only</option>
                  <option>Sports Only</option>
                  <option>Crypto Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1.5">
                  Starting Capital
                </label>
                <input
                  type="number"
                  defaultValue={10000}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 px-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1.5">
                  Strategy
                </label>
                <select className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2 px-3 text-sm text-white focus:border-primary-500 focus:outline-none">
                  <option>Simple Arbitrage</option>
                  <option>Market Making</option>
                  <option>Momentum Trading</option>
                </select>
              </div>
            </div>
            <button className="px-6 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors flex items-center gap-1.5">
              <Play className="w-4 h-4" />
              Run Backtest
            </button>
          </div>

          {/* Results */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h3 className="text-white font-semibold mb-1">Backtest Results</h3>
            <p className="text-xs text-surface-500 mb-4">{backtest.period}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500">Total Profit</div>
                <div className="text-xl font-bold text-green-400">
                  +{formatCurrency(backtest.totalProfit)}
                </div>
                <div className="text-xs text-surface-400">
                  {formatPercent(backtest.totalProfitPercent)}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500">Win Rate</div>
                <div className="text-xl font-bold text-white">
                  {backtest.winRate}%
                </div>
                <div className="text-xs text-surface-400">
                  {backtest.winningTrades}W / {backtest.losingTrades}L
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500">Sharpe Ratio</div>
                <div className="text-xl font-bold text-white">
                  {backtest.sharpeRatio}
                </div>
                <div className="text-xs text-accent-400">Excellent</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                <div className="text-xs text-surface-500">Max Drawdown</div>
                <div className="text-xl font-bold text-amber-400">
                  {formatPercent(backtest.maxDrawdownPercent)}
                </div>
                <div className="text-xs text-surface-400">
                  {formatCurrency(backtest.maxDrawdown)}
                </div>
              </div>
            </div>

            {/* Equity curve */}
            <div className="mb-6">
              <div className="text-xs text-surface-500 mb-2">Equity Curve</div>
              <div className="h-32 flex items-end gap-[2px]">
                {backtest.dailyReturns.map((d, i) => {
                  const min = Math.min(...backtest.dailyReturns.map((r) => r.value));
                  const max = Math.max(...backtest.dailyReturns.map((r) => r.value));
                  const height =
                    ((d.value - min) / (max - min)) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary-600 to-accent-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.max(height, 5)}%` }}
                      title={`Day ${d.day}: ${formatCurrency(d.value)}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* By category */}
            <div className="mb-6">
              <div className="text-xs text-surface-500 mb-2">Performance by Category</div>
              <div className="space-y-2">
                {backtest.byCategory.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="text-sm text-surface-300 w-20">
                      {cat.name}
                    </span>
                    <div className="flex-1 bg-surface-800 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${cat.percent}%` }}
                      />
                    </div>
                    <span className="text-sm text-white w-24 text-right">
                      +{formatCurrency(cat.profit)} ({cat.percent}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-2">
                <div className="text-xs text-surface-500">Total Trades</div>
                <div className="text-sm font-bold text-white">{backtest.totalTrades}</div>
              </div>
              <div className="text-center p-2">
                <div className="text-xs text-surface-500">Avg/Trade</div>
                <div className="text-sm font-bold text-white">
                  {formatCurrency(backtest.avgProfitPerTrade)}
                </div>
              </div>
              <div className="text-center p-2">
                <div className="text-xs text-surface-500">Largest Win</div>
                <div className="text-sm font-bold text-green-400">
                  +{formatCurrency(backtest.largestWin)}
                </div>
              </div>
              <div className="text-center p-2">
                <div className="text-xs text-surface-500">Largest Loss</div>
                <div className="text-sm font-bold text-red-400">
                  {formatCurrency(backtest.largestLoss)}
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="p-6 rounded-xl border border-primary-800/30 bg-primary-950/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-400" />
              </div>
              <div className="text-sm text-surface-300 space-y-2">
                <div className="text-primary-300 font-medium">AI Analysis</div>
                <p>
                  &quot;Your strategy would have been profitable in backtesting! 65.6% win
                  rate is strong for arbitrage. Profit factor of 3.12 means you make
                  $3.12 for every $1 lost. Politics markets were most profitable due
                  to higher liquidity.&quot;
                </p>
                <p className="text-surface-400">
                  &quot;Concerns: Backtest doesn&apos;t account for execution delays. Real
                  slippage might be 10-20% worse. Recommendation: Start with 50% of
                  this position size in live trading.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
