import Link from "next/link";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white">Bot Academy</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              Learn to build profitable Polymarket trading bots from scratch.
              From theory to live deployment.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm text-surface-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/pricing" className="text-sm text-surface-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-surface-400 hover:text-white transition-colors">Learn</Link></li>
              <li><Link href="/dashboard" className="text-sm text-surface-400 hover:text-white transition-colors">Practice</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Risk Disclosure</Link></li>
              <li><Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            Polymarket Bot Academy. For educational purposes only. Trading involves risk.
          </p>
          <p className="text-sm text-surface-500">
            Not affiliated with Polymarket.
          </p>
        </div>
      </div>
    </footer>
  );
}
