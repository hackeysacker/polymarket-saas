import Link from "next/link";
import { Check } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            Start for free. Upgrade when you&apos;re ready to deploy bots to
            production. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                    <span className="text-sm text-surface-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.price === 0 ? "/auth/signup" : "/auth/signup"}
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
      </div>
    </section>
  );
}
