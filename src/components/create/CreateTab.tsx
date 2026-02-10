"use client";

import { useState } from "react";
import {
  CheckCircle,
  Circle,
  Wallet,
  DollarSign,
  Key,
  Settings,
  Rocket,
  Shield,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Bot,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Wallet Setup", icon: Wallet, description: "Create and secure your trading wallet" },
  { id: 2, title: "Fund Account", icon: DollarSign, description: "Add USDC and MATIC to your wallet" },
  { id: 3, title: "API Setup", icon: Key, description: "Configure Polymarket API credentials" },
  { id: 4, title: "Bot Config", icon: Settings, description: "Set your trading parameters" },
  { id: 5, title: "Security Check", icon: Shield, description: "Verify security before going live" },
  { id: 6, title: "Deploy", icon: Rocket, description: "Launch your bot to production" },
];

export default function CreateTab() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const [checklist, setChecklist] = useState({
    walletCreated: false,
    seedPhraseBackedUp: false,
    polygonAdded: false,
    addressCopied: false,
    usdcFunded: false,
    maticFunded: false,
    apiKeyGenerated: false,
    privateKeySecured: false,
    botTested: false,
    backtestPositive: false,
    understandRisks: false,
    emergencyPlan: false,
    alertsConfigured: false,
    riskDisclosureRead: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completeStep = () => {
    setCompletedSteps((prev) => new Set([...Array.from(prev), currentStep]));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div>
      {/* Step Progress */}
      <div className="mb-8 p-6 rounded-xl border border-surface-800 bg-surface-900/50">
        <h2 className="text-lg font-bold text-white mb-4">
          Bot Deployment Wizard
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                  currentStep === step.id
                    ? "bg-primary-600/10 text-primary-400 border border-primary-600/20"
                    : completedSteps.has(step.id)
                    ? "text-accent-400"
                    : "text-surface-500 hover:text-surface-300"
                )}
              >
                {completedSteps.has(step.id) ? (
                  <CheckCircle className="w-4 h-4 text-accent-400" />
                ) : currentStep === step.id ? (
                  <step.icon className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.id}</span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-6 h-px bg-surface-700 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {/* Step 1: Wallet Setup */}
        {currentStep === 1 && (
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 1: Wallet Setup & Security
                </h3>
                <p className="text-sm text-surface-400">
                  Create a dedicated trading wallet for your bot
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/30 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div className="text-sm text-amber-300">
                  <strong>Important:</strong> Create a DEDICATED wallet just for
                  your bot. Never use your main wallet — this limits risk if the
                  bot is compromised.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <CheckItem
                checked={checklist.walletCreated}
                onChange={() => toggleCheck("walletCreated")}
                title="Install MetaMask and create new wallet"
                description="Visit metamask.io/download, install the extension, and create a new wallet with a strong password."
              />
              <CheckItem
                checked={checklist.seedPhraseBackedUp}
                onChange={() => toggleCheck("seedPhraseBackedUp")}
                title="Backup seed phrase on paper (CRITICAL)"
                description="Write your 12-word seed phrase on paper. Store in a safe place. NEVER store digitally — no screenshots, no cloud, no notes app."
              />
              <CheckItem
                checked={checklist.polygonAdded}
                onChange={() => toggleCheck("polygonAdded")}
                title="Add Polygon network to MetaMask"
                description="Polymarket runs on Polygon. Add it: Network Name: Polygon Mainnet, RPC: https://polygon-rpc.com, Chain ID: 137"
              />
              <CheckItem
                checked={checklist.addressCopied}
                onChange={() => toggleCheck("addressCopied")}
                title="Copy your wallet address"
                description="Your public address (0x...) is safe to share. This is where you'll send funds. NOT your private key."
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={completeStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continue to Funding
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Fund Account */}
        {currentStep === 2 && (
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 2: Fund Your Bot
                </h3>
                <p className="text-sm text-surface-400">
                  Add USDC and MATIC to your Polygon wallet
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary-950/20 border border-primary-800/30 mb-6">
              <div className="flex items-start gap-2">
                <Bot className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="text-sm text-surface-300">
                  <span className="text-primary-300 font-medium">
                    AI Recommendation:
                  </span>{" "}
                  Based on your Market Making strategy, start with $200-500.
                  This allows 2-5 concurrent $100 positions. Never fund more
                  than you can afford to lose.
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Funding Options
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-surface-700 bg-surface-800/50">
                  <h5 className="text-sm font-medium text-white mb-2">
                    Option A: Exchange to Polygon
                  </h5>
                  <ol className="text-xs text-surface-400 space-y-1.5">
                    <li>1. Buy USDC on Coinbase/Binance</li>
                    <li>2. Withdraw to your Polygon address</li>
                    <li>3. Select Polygon network (NOT Ethereum!)</li>
                    <li>4. Buy ~$5 MATIC for gas fees</li>
                  </ol>
                </div>
                <div className="p-4 rounded-lg border border-surface-700 bg-surface-800/50">
                  <h5 className="text-sm font-medium text-white mb-2">
                    Option B: Bridge from Ethereum
                  </h5>
                  <ol className="text-xs text-surface-400 space-y-1.5">
                    <li>1. Go to wallet.polygon.technology/bridge</li>
                    <li>2. Connect MetaMask wallet</li>
                    <li>3. Bridge USDC from Ethereum to Polygon</li>
                    <li>4. Wait ~10 minutes for confirmation</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <CheckItem
                checked={checklist.usdcFunded}
                onChange={() => toggleCheck("usdcFunded")}
                title="USDC deposited to Polygon wallet"
                description="Verify your USDC balance on Polygonscan. Recommended: $200-500 for initial testing."
              />
              <CheckItem
                checked={checklist.maticFunded}
                onChange={() => toggleCheck("maticFunded")}
                title="MATIC available for gas fees"
                description="You need ~$5-10 of MATIC for transaction gas fees on Polygon."
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={completeStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continue to API Setup
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: API Setup */}
        {currentStep === 3 && (
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 3: Polymarket API Setup
                </h3>
                <p className="text-sm text-surface-400">
                  Configure API credentials for programmatic trading
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Polymarket API Key
                </label>
                <p className="text-xs text-surface-400 mb-2">
                  Generate at Polymarket.com &rarr; Account &rarr; API Keys
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="poly_xxxxxxxxxxxx"
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2.5 px-3 pr-20 text-sm text-white font-mono focus:border-primary-500 focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-surface-500 hover:text-white px-2 py-1 rounded border border-surface-700 transition-colors">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Encrypt
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Private Key
                </label>
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/30 mb-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-red-300">
                      Your private key gives COMPLETE CONTROL over your wallet.
                      We will encrypt it immediately and never display it again.
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={showPrivateKey ? "text" : "password"}
                    placeholder="0x..."
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg py-2.5 px-3 pr-24 text-sm text-white font-mono focus:border-primary-500 focus:outline-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="text-surface-500 hover:text-white p-1 transition-colors"
                    >
                      {showPrivateKey ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button className="text-xs text-surface-500 hover:text-white px-2 py-1 rounded border border-surface-700 transition-colors">
                      <Lock className="w-3 h-3 inline mr-1" />
                      Encrypt
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <CheckItem
                  checked={checklist.apiKeyGenerated}
                  onChange={() => toggleCheck("apiKeyGenerated")}
                  title="API key generated and encrypted"
                  description="Your API key is stored securely and will never be displayed in plain text."
                />
                <CheckItem
                  checked={checklist.privateKeySecured}
                  onChange={() => toggleCheck("privateKeySecured")}
                  title="Private key encrypted and secured"
                  description="Your private key is encrypted at rest. Enable 2FA on Polymarket for extra security."
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={completeStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continue to Bot Config
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Bot Config */}
        {currentStep === 4 && (
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 4: Bot Configuration
                </h3>
                <p className="text-sm text-surface-400">
                  Review and finalize your trading parameters
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Strategy Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Strategy", value: "Market Making", editable: false },
                    { label: "Base Spread", value: "2.5%", editable: true },
                    { label: "Position Size", value: "$100", editable: true },
                    { label: "Max Positions", value: "5", editable: true },
                    { label: "Markets", value: "Politics + Sports", editable: false },
                    { label: "Min Volume", value: "$50,000", editable: true },
                  ].map((param) => (
                    <div
                      key={param.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-800/50 border border-surface-700"
                    >
                      <span className="text-sm text-surface-400">
                        {param.label}
                      </span>
                      <span className="text-sm text-white font-medium">
                        {param.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Risk Management
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Daily Loss Limit", value: "$50 (-10%)" },
                    { label: "Max Drawdown", value: "$100 (-20%)" },
                    { label: "Position Hold Time", value: "24 hours max" },
                    { label: "Slippage Tolerance", value: "1%" },
                  ].map((param) => (
                    <div
                      key={param.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-800/50 border border-surface-700"
                    >
                      <span className="text-sm text-surface-400">
                        {param.label}
                      </span>
                      <span className="text-sm text-white font-medium">
                        {param.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={completeStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continue to Security Check
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Security Check */}
        {currentStep === 5 && (
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-950/50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 5: Security Verification
                </h3>
                <p className="text-sm text-surface-400">
                  Final checks before deploying to production
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <CheckItem
                checked={checklist.botTested}
                onChange={() => toggleCheck("botTested")}
                title="Bot tested in simulator for 7+ days"
                description="Your bot should show consistent performance in the mock simulator before going live."
              />
              <CheckItem
                checked={checklist.backtestPositive}
                onChange={() => toggleCheck("backtestPositive")}
                title="Backtest shows positive returns"
                description="Historical backtesting demonstrates profitable strategy with acceptable drawdown."
              />
              <CheckItem
                checked={checklist.emergencyPlan}
                onChange={() => toggleCheck("emergencyPlan")}
                title="Emergency stop procedure documented"
                description="You know exactly how to halt the bot immediately if something goes wrong."
              />
              <CheckItem
                checked={checklist.alertsConfigured}
                onChange={() => toggleCheck("alertsConfigured")}
                title="Monitoring alerts configured"
                description="Telegram/Discord alerts set up for trades, errors, and daily P&L summaries."
              />
              <CheckItem
                checked={checklist.understandRisks}
                onChange={() => toggleCheck("understandRisks")}
                title="I understand every parameter of my bot"
                description="You can explain what each setting does and why you chose those values."
              />
              <CheckItem
                checked={checklist.riskDisclosureRead}
                onChange={() => toggleCheck("riskDisclosureRead")}
                title="I acknowledge trading risks"
                description="Bots can lose money. Markets are unpredictable. Only risk what you can afford to lose."
              />
            </div>

            <div className="mt-6 p-4 rounded-lg bg-surface-800/50 border border-surface-700">
              <div className="text-sm text-surface-400">
                <strong className="text-white">Security Score:</strong>{" "}
                {Object.values(checklist).filter(Boolean).length}/
                {Object.values(checklist).length} checks passed
              </div>
              <div className="w-full bg-surface-700 rounded-full h-1.5 mt-2">
                <div
                  className="bg-accent-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${
                      (Object.values(checklist).filter(Boolean).length /
                        Object.values(checklist).length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={completeStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continue to Deploy
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Deploy */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-accent-800/30 bg-accent-950/10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Deploy!
                </h3>
                <p className="text-surface-400 max-w-md mx-auto mb-6">
                  Your bot has passed all security checks and is configured for
                  production. Click below to go live.
                </p>
                <button className="px-8 py-3 text-base font-semibold text-white bg-accent-600 hover:bg-accent-500 rounded-xl shadow-lg shadow-accent-600/25 transition-all">
                  Deploy Bot to Production
                </button>
              </div>
            </div>

            {/* Live Dashboard Preview */}
            <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
              <h3 className="text-lg font-bold text-white mb-4">
                Live Dashboard Preview
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500">Status</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Running
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500">Capital</div>
                  <div className="text-lg font-bold text-white">$500.00</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500">Markets</div>
                  <div className="text-lg font-bold text-white">47</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-800/50 border border-surface-700">
                  <div className="text-xs text-surface-500">P&L</div>
                  <div className="text-lg font-bold text-surface-400">$0.00</div>
                </div>
              </div>
            </div>

            {/* Post-Deploy Coaching */}
            <div className="p-6 rounded-xl border border-primary-800/30 bg-primary-950/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary-400" />
                </div>
                <div className="text-sm text-surface-300 space-y-2">
                  <div className="text-primary-300 font-medium">
                    Post-Deployment Coaching
                  </div>
                  <p>
                    &quot;Congratulations on reaching deployment! Here&apos;s your checklist
                    for the first 24 hours:&quot;
                  </p>
                  <ul className="space-y-1 text-xs text-surface-400">
                    <li>1. Check dashboard every few hours</li>
                    <li>2. Review each trade as it happens</li>
                    <li>3. Verify bot behaves as expected</li>
                    <li>4. Watch for any errors or unexpected behavior</li>
                    <li>5. Don&apos;t panic if first few trades lose money</li>
                    <li>
                      6. Give strategy 50-100 trades to prove out
                    </li>
                  </ul>
                  <p className="text-surface-500 mt-2">
                    Use the Emergency Stop button if anything seems wrong.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Security Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckItem({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-colors",
        checked
          ? "border-accent-800/30 bg-accent-950/10"
          : "border-surface-700 bg-surface-800/30 hover:bg-surface-800/50"
      )}
    >
      <div className="shrink-0 mt-0.5">
        {checked ? (
          <CheckCircle className="w-5 h-5 text-accent-400" />
        ) : (
          <Circle className="w-5 h-5 text-surface-500" />
        )}
      </div>
      <div>
        <div
          className={cn(
            "text-sm font-medium",
            checked ? "text-accent-300" : "text-white"
          )}
        >
          {title}
        </div>
        <div className="text-xs text-surface-400 mt-0.5">{description}</div>
      </div>
    </button>
  );
}
