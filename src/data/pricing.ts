export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Start learning about prediction markets and bot trading",
    features: [
      "First 15 LEARN modules",
      "Read-only mock simulator",
      "View example bots",
      "Community forum access",
      "Basic knowledge base",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    name: "Starter",
    price: 49,
    period: "month",
    description: "Full learning experience with simulator access and your first bot",
    features: [
      "All 47 LEARN modules",
      "Full PRACTICE simulator",
      "Deploy 1 live bot",
      "Strategy templates library",
      "Backtesting engine",
      "Basic email support",
      "AI coaching assistant",
    ],
    highlighted: false,
    cta: "Start Learning",
  },
  {
    name: "Pro",
    price: 149,
    period: "month",
    description: "Advanced strategies, multiple bots, and priority support",
    features: [
      "Everything in Starter",
      "Deploy up to 3 bots",
      "Advanced strategies (ML, multi-strategy)",
      "Priority support",
      "Custom bot development help",
      "VPS hosting guidance",
      "Advanced backtesting",
      "Performance analytics dashboard",
    ],
    highlighted: true,
    cta: "Go Pro",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: 499,
    period: "month",
    description: "Unlimited bots with white-glove service and 1-on-1 strategy sessions",
    features: [
      "Everything in Pro",
      "Unlimited bot deployments",
      "White-glove setup service",
      "Monthly 1-on-1 strategy session",
      "Custom strategy development",
      "Dedicated support channel",
      "API access for integrations",
      "Team collaboration tools",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];
