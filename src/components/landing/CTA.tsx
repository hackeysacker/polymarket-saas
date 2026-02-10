import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative bg-surface-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary-600/20">
          <Bot className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Build Your First Bot?
        </h2>
        <p className="text-lg text-surface-400 mb-10 max-w-xl mx-auto">
          Join the academy, learn prediction market fundamentals, and build
          your first profitable trading bot. Start with $10,000 in mock USDC
          and zero risk.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2"
          >
            Start Learning Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-surface-300 hover:text-white bg-surface-800/50 hover:bg-surface-800 border border-surface-700 rounded-xl transition-all flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>

        <p className="text-sm text-surface-500 mt-6">
          Full demo mode — explore all features instantly. No login required.
        </p>
      </div>
    </section>
  );
}
