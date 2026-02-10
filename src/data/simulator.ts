export interface MockTrade {
  id: number;
  timestamp: string;
  market: string;
  strategy: string;
  action: string;
  yesPrice: number;
  noPrice: number;
  shares: number;
  cost: number;
  profit: number;
  profitPercent: number;
  status: "won" | "lost" | "open" | "failed";
  details: string;
}

export interface MockOpportunity {
  id: number;
  market: string;
  yesPrice: number;
  noPrice: number;
  totalCost: number;
  profitPercent: number;
  volume: number;
  liquidity: "HIGH" | "MEDIUM" | "LOW";
  strength: "strong" | "moderate" | "weak";
  recommendation: string;
}

export interface BotConfig {
  name: string;
  strategy: string;
  status: "running" | "stopped" | "paused";
  uptime: string;
  marketsMonitored: number;
  opportunitiesFound: number;
  tradesExecuted: number;
  winRate: number;
  avgProfitPerTrade: number;
  largestWin: number;
  largestLoss: number;
}

export interface AccountStatus {
  balance: number;
  activeMarkets: number;
  pnlToday: number;
  pnlTodayPercent: number;
  pnlWeek: number;
  pnlWeekPercent: number;
  totalTrades: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface BacktestResult {
  period: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalProfit: number;
  totalProfitPercent: number;
  avgProfitPerTrade: number;
  largestWin: number;
  largestLoss: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio: number;
  profitFactor: number;
  byCategory: { name: string; profit: number; percent: number }[];
  dailyReturns: { day: number; value: number }[];
}

export const defaultAccountStatus: AccountStatus = {
  balance: 10000,
  activeMarkets: 156,
  pnlToday: 47.3,
  pnlTodayPercent: 0.47,
  pnlWeek: 127.8,
  pnlWeekPercent: 1.28,
  totalTrades: 34,
  winRate: 64.7,
  wins: 22,
  losses: 12,
};

export const defaultBotConfig: BotConfig = {
  name: "ArbitrageBot_v1",
  strategy: "Simple Arbitrage",
  status: "running",
  uptime: "2h 34m",
  marketsMonitored: 45,
  opportunitiesFound: 127,
  tradesExecuted: 34,
  winRate: 64.7,
  avgProfitPerTrade: 3.42,
  largestWin: 8.9,
  largestLoss: -2.1,
};

export const mockTrades: MockTrade[] = [
  {
    id: 34,
    timestamp: "3 minutes ago",
    market: "Will Bitcoin hit $150k by March 2026?",
    strategy: "Arbitrage (YES + NO = $0.97)",
    action: "Bought 50 YES at $0.485, 50 NO at $0.482",
    yesPrice: 0.485,
    noPrice: 0.482,
    shares: 50,
    cost: 48.35,
    profit: 1.65,
    profitPercent: 3.41,
    status: "open",
    details: "Position open, hedged. Potential payout: $50.00",
  },
  {
    id: 33,
    timestamp: "8 minutes ago",
    market: "Will Trump win 2026 midterms?",
    strategy: "Arbitrage (YES + NO = $0.96)",
    action: "Bought 100 YES at $0.52, 100 NO at $0.44",
    yesPrice: 0.52,
    noPrice: 0.44,
    shares: 100,
    cost: 96.0,
    profit: 2.0,
    profitPercent: 2.08,
    status: "won",
    details: "Settled: $100.00 after $2 fee",
  },
  {
    id: 32,
    timestamp: "12 minutes ago",
    market: 'Super Bowl winner: Chiefs or Eagles?',
    strategy: "Arbitrage detected (YES + NO = $0.98)",
    action: "Attempted 100 shares, only 30 filled",
    yesPrice: 0.51,
    noPrice: 0.47,
    shares: 30,
    cost: 0.3,
    profit: -0.3,
    profitPercent: -100,
    status: "failed",
    details: "Insufficient liquidity. Bot cancelled partial order.",
  },
  {
    id: 31,
    timestamp: "18 minutes ago",
    market: "Will Fed cut rates in March?",
    strategy: "Arbitrage (YES + NO = $0.96)",
    action: "Bought 75 YES at $0.48, 75 NO at $0.48",
    yesPrice: 0.48,
    noPrice: 0.48,
    shares: 75,
    cost: 72.0,
    profit: 3.0,
    profitPercent: 4.17,
    status: "won",
    details: "Settled: $75.00 after $1.50 fee",
  },
  {
    id: 30,
    timestamp: "25 minutes ago",
    market: "Ethereum above $4k by April?",
    strategy: "Arbitrage (YES + NO = $0.97)",
    action: "Bought 60 YES at $0.50, 60 NO at $0.47",
    yesPrice: 0.50,
    noPrice: 0.47,
    shares: 60,
    cost: 58.2,
    profit: 1.8,
    profitPercent: 3.09,
    status: "won",
    details: "Settled: $60.00 after $1.20 fee",
  },
];

export const mockOpportunities: MockOpportunity[] = [
  {
    id: 1,
    market: "Will Fed cut rates in March?",
    yesPrice: 0.48,
    noPrice: 0.49,
    totalCost: 0.97,
    profitPercent: 3.09,
    volume: 1200000,
    liquidity: "HIGH",
    strength: "strong",
    recommendation: "EXECUTE",
  },
  {
    id: 2,
    market: "Ethereum above $4k by April?",
    yesPrice: 0.67,
    noPrice: 0.35,
    totalCost: 1.02,
    profitPercent: -2.0,
    volume: 430000,
    liquidity: "MEDIUM",
    strength: "moderate",
    recommendation: "SKIP (prices inverted)",
  },
  {
    id: 3,
    market: "Will new Star Wars movie flop?",
    yesPrice: 0.51,
    noPrice: 0.5,
    totalCost: 1.01,
    profitPercent: -1.0,
    volume: 15000,
    liquidity: "LOW",
    strength: "weak",
    recommendation: "SKIP (fees eat profit)",
  },
];

export const defaultBacktestResult: BacktestResult = {
  period: "Jan 1 - Feb 5, 2026",
  totalTrades: 847,
  winningTrades: 556,
  losingTrades: 291,
  winRate: 65.6,
  totalProfit: 2340,
  totalProfitPercent: 23.4,
  avgProfitPerTrade: 2.76,
  largestWin: 45.3,
  largestLoss: -12.8,
  maxDrawdown: -180,
  maxDrawdownPercent: -1.8,
  sharpeRatio: 2.34,
  profitFactor: 3.12,
  byCategory: [
    { name: "Politics", profit: 1240, percent: 53 },
    { name: "Sports", profit: 680, percent: 29 },
    { name: "Crypto", profit: 420, percent: 18 },
  ],
  dailyReturns: Array.from({ length: 36 }, (_, i) => ({
    day: i + 1,
    value: 10000 + Math.floor(Math.random() * 300 + i * 60),
  })),
};

export const botCodeExample = `# Simple Arbitrage Bot - Polymarket Bot Academy
import os
import time
import logging
from typing import List, Dict, Optional

# Configure logging
logging.basicConfig(level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s')
log = logging.getLogger('ArbitrageBot')

# API Configuration
API_KEY = os.getenv('POLY_API_KEY')
PRIVATE_KEY = os.getenv('POLY_PRIVATE_KEY')

# Bot Parameters
POSITION_SIZE = 100        # $100 per trade
MIN_PROFIT_PCT = 2.5       # Minimum 2.5% profit
CHECK_INTERVAL = 30        # Seconds between scans
MAX_POSITIONS = 5          # Max concurrent positions
MIN_VOLUME = 50000         # Minimum market volume

class ArbitrageBot:
    def __init__(self):
        self.api = PolymarketAPI(api_key=API_KEY)
        self.positions = []
        self.trade_count = 0
        self.total_profit = 0

    def find_opportunities(self) -> List[Dict]:
        """Scan markets for arbitrage opportunities"""
        markets = self.api.get_active_markets(limit=50)
        opportunities = []

        for market in markets:
            yes_price = market['best_ask_yes']
            no_price = market['best_ask_no']
            total = yes_price + no_price

            # Need total < 0.98 for profit after 2% fee
            if total < 0.98:
                spread = 1.00 - total
                profit_pct = (spread / total) * 100

                # Check liquidity
                if market.get('volume', 0) >= MIN_VOLUME:
                    opportunities.append({
                        'market_id': market['id'],
                        'title': market['question'],
                        'yes_price': yes_price,
                        'no_price': no_price,
                        'spread': spread,
                        'profit_pct': profit_pct,
                        'volume': market['volume'],
                    })

        return sorted(opportunities,
                      key=lambda x: x['profit_pct'],
                      reverse=True)

    def execute_trade(self, opp: Dict) -> bool:
        """Execute both sides of an arbitrage trade"""
        if len(self.positions) >= MAX_POSITIONS:
            log.warning("Max positions reached, skipping")
            return False

        try:
            yes_shares = POSITION_SIZE / opp['yes_price']
            no_shares = POSITION_SIZE / opp['no_price']

            # Place both orders
            yes_order = self.api.place_order(
                market_id=opp['market_id'],
                side='YES',
                price=opp['yes_price'],
                size=int(yes_shares)
            )

            no_order = self.api.place_order(
                market_id=opp['market_id'],
                side='NO',
                price=opp['no_price'],
                size=int(no_shares)
            )

            profit = opp['spread'] * POSITION_SIZE
            self.trade_count += 1
            self.total_profit += profit

            log.info(f"Trade #{self.trade_count}: {opp['title']}")
            log.info(f"  Profit: \${profit:.2f} ({opp['profit_pct']:.1f}%)")

            return True

        except Exception as e:
            log.error(f"Trade failed: {e}")
            return False

    def run(self):
        """Main bot loop"""
        log.info("ArbitrageBot starting...")
        log.info(f"Config: \${POSITION_SIZE}/trade, "
                 f"{MIN_PROFIT_PCT}% min profit")

        while True:
            try:
                opps = self.find_opportunities()

                if opps:
                    best = opps[0]
                    log.info(f"Found {len(opps)} opportunities")
                    log.info(f"Best: {best['profit_pct']:.1f}% - "
                             f"{best['title']}")

                    if best['profit_pct'] > MIN_PROFIT_PCT:
                        self.execute_trade(best)

                time.sleep(CHECK_INTERVAL)

            except KeyboardInterrupt:
                log.info("Bot stopped by user")
                break
            except Exception as e:
                log.error(f"Error in main loop: {e}")
                time.sleep(60)  # Wait longer on error

if __name__ == '__main__':
    bot = ArbitrageBot()
    bot.run()`;

export const strategies = [
  {
    id: "arbitrage",
    name: "Simple Arbitrage",
    difficulty: "Beginner",
    risk: "Low Risk",
    description: "Find YES + NO < $1 and buy both sides for guaranteed profit",
    expectedReturn: "5-15% monthly",
    winRate: "65%",
  },
  {
    id: "market-making",
    name: "Market Making",
    difficulty: "Intermediate",
    risk: "Medium Risk",
    description: "Provide liquidity and earn spread + rewards",
    expectedReturn: "10-20% monthly",
    winRate: "70%",
  },
  {
    id: "momentum",
    name: "Momentum Trading",
    difficulty: "Advanced",
    risk: "High Risk",
    description: "Detect and ride price spikes from news events",
    expectedReturn: "20-50% monthly",
    winRate: "55%",
  },
  {
    id: "copy-trading",
    name: "Copy Trading",
    difficulty: "Beginner",
    risk: "Medium Risk",
    description: "Mirror trades from successful wallets on-chain",
    expectedReturn: "Varies",
    winRate: "Varies",
  },
];
