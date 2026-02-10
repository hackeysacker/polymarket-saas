import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl mx-auto">
              Start free with 15 modules. Upgrade when you&apos;re ready to build,
              test, and deploy bots to production.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col",
                  tier.highlighted
                    ? "border-primary-500 bg-surface-900 shadow-lg shadow-primary-600/10"
                    : "border-surface-800 bg-surface-900/30"
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-full">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-surface-400 min-h-[40px]">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${tier.price}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-surface-400">/{tier.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-surface-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={cn(
                    "w-full py-2.5 px-4 text-sm font-medium rounded-lg text-center transition-colors",
                    tier.highlighted
                      ? "bg-primary-600 hover:bg-primary-500 text-white"
                      : "bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white border border-surface-700"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do I need coding experience to use Bot Academy?",
                  a: "No! Our curriculum starts from scratch. Section 1 covers prediction market fundamentals, and we offer a no-code visual bot builder alongside the code-based path. Developers and non-developers can both build profitable bots.",
                },
                {
                  q: "How much money do I need to start trading?",
                  a: "We recommend starting with $200-500 in USDC on Polygon. The mock simulator gives you $10,000 in virtual USDC to practice risk-free. Never invest more than you can afford to lose.",
                },
                {
                  q: "Is the mock simulator using real market data?",
                  a: "Yes! The simulator uses real Polymarket market data and order book structures. The only difference is that trades execute with mock USDC, so there's zero financial risk while learning.",
                },
                {
                  q: "Can I really make money with prediction market bots?",
                  a: "Arbitrageurs have earned over $40M in profits on Polymarket. However, past performance doesn't guarantee future results. Bots can lose money. Our curriculum teaches risk management alongside strategy development.",
                },
                {
                  q: "What happens if my bot makes a mistake?",
                  a: "We build multiple safety nets: daily loss limits, position size caps, circuit breakers, and emergency stop procedures. The CREATE tab's deployment wizard verifies all risk controls before going live.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes, all plans are month-to-month with no long-term commitment. Cancel anytime from your account settings. Your bots continue running on your own infrastructure even after cancellation.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="p-5 rounded-xl border border-surface-800 bg-surface-900/30"
                >
                  <h3 className="text-white font-medium mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-surface-400 pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
