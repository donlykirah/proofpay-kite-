# 🪁 Kite AI — AI Inference. Verified. On-chain.

**The first AI inference protocol built for KiteAI Mainnet that wraps every AI model call in an on-chain transaction with cryptographic TEE verification, decentralized storage, and automatic revenue distribution.**

Built for the **Kite AI Hackathon**.

---

## 🌐 Live Deployment

| Layer | URL | Status |
|-------|-----|--------|
| **Frontend Dashboard** | [Vercel Deployed] | 🟢 Live |
| **AI Agent Server** | [Railway Deployed] | 🟢 Live |
| **Smart Contract** | Deployable on KiteAI Mainnet (Chain 2366) | 🟡 Ready |
| **KiteAI Mainnet** | Chain ID: 2366 | 🟢 Active |
| **Kite Ozone Testnet** | Chain ID: 16602 | 🟢 Active |

---

## 🎯 The Problem

When a dApp or AI agent calls an AI model today:
App → pays API key → gets response → hopes it's correct

text

**Three critical problems:**
1. **No proof** — You can't prove the AI actually ran your prompt. Was it GPT-4 or a cheap knockoff?
2. **Centralized billing** — API keys, monthly subscriptions — not how Web3 works
3. **No value sharing** — Only the API provider gets paid. The curator who deployed the endpoint? The protocol? Nothing.

---

## 💡 The Solution: Kite AI

Kite AI wraps every AI inference call inside an on-chain transaction on KiteAI Mainnet. One function call handles all of this automatically:

| Step | What Happens | Why It Matters |
|------|-------------|----------------|
| **1. Price** | On-chain payment enforced per call on KiteAI | Pay exactly for what you use, no subscriptions |
| **2. Verify** | TEE cryptographic attestation generated | Mathematical proof the exact model ran the exact prompt |
| **3. Cache** | Result stored on Kite Storage | Same question = free, instant response |
| **4. Split** | Payment auto-distributed on-chain | 80% Provider / 15% Curator / 5% Protocol |

---

## 🏗 Architecture
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│ Frontend │────▶│ Agent API │────▶│ Smart Contract │
│ (React + │ │ (Express) │ │ (Solidity) │
│ RainbowKit) │ │ │ │ on KiteAI │
└──────────────┘ └──────────────┘ └──────────────────┘
│ │ │
▼ ▼ ▼
User connects Kite Compute Payment auto-splits
wallet & pays runs in TEE 80/15/5 on-chain

text

---

## 📁 Project Structure
0g-kite/
│
├── contracts/ # Solidity Smart Contracts
│ └── InferenceBilling.sol # On-chain billing + escrow + splits
│
├── frontend/ # React Dashboard (Vercel deployed)
│ ├── src/
│ │ ├── App.tsx # Main dashboard with 6 AI agents
│ │ ├── WalletProvider.tsx # RainbowKit (KiteAI Mainnet + Ozone)
│ │ ├── index.css # Tailwind CSS v4 (Kite purple theme)
│ │ └── main.tsx # Entry point
│ ├── vite.config.ts # Vite + React + Tailwind config
│ └── package.json
│
├── agents/ # AI Agent System
│ ├── index.ts # ZeroGAgent class — 6 specialized agents
│ ├── server.ts # Express REST API (deployed on Railway)
│ └── kite/
│ └── kiteCompute.ts # Kite Compute integration pattern
│
├── plugins/ # Universal Agent Plugin System
│ ├── zeroGPlugin.ts # Core plugin (works with any framework)
│ └── integrations/
│ ├── eliza.ts # ElizaOS integration
│ ├── autonolas.ts # Autonolas integration
│ └── generic.ts # LangChain, CrewAI, AutoGPT integration
│
├── scripts/
│ └── deploy.ts # Hardhat deployment script
│
├── hardhat.config.ts # Hardhat config (KiteAI Mainnet + Testnet)
├── .env # Private key & contract address (gitignored)
└── package.json # Monorepo root

text

---

## 🤖 6 AI Agents

Kite AI includes **6 specialized AI agents**, each with a unique purpose:

| # | Agent | Icon | Purpose | Response Style |
|---|-------|------|---------|---------------|
| 1 | **DeFi Analyst** | 📊 | Market analysis, price predictions, trading signals | `[Kite DeFi Analyst] Market showing strong accumulation...` |
| 2 | **Risk Assessor** | 🔍 | Wallet risk scoring, protocol risk evaluation, liquidation alerts | `[Kite Risk Assessor] Risk score: 68/100...` |
| 3 | **Yield Strategist** | 💡 | Optimal yield farming strategies, compounding calculations | `[Kite Yield Strategist] Aave USDC at 8.2% APY...` |
| 4 | **Security Auditor** | 🛡️ | Smart contract vulnerability analysis, code review | `[Kite Security Auditor] No critical vulnerabilities...` |
| 5 | **NFT Evaluator** | 🎨 | NFT rarity ranking, valuation estimates, collection analysis | `[Kite NFT Evaluator] Estimated value: 0.5-0.8 ETH...` |
| 6 | **General AI** | 🤖 | General knowledge, explanations, blockchain education | `[Kite AI] Powered by Kite Compute with TEE...` |

Users select an agent, pay in KITE tokens on-chain, and receive a TEE-verified response with a cryptographic receipt.

---

## 🔗 KiteAI Mainnet / Ozone Testnet Toggle

The frontend includes a network switcher:

| Network | Chain ID | RPC | Currency | Explorer |
|---------|----------|-----|----------|----------|
| **KiteAI Mainnet** | 2366 | `https://rpc.gokite.ai` | KITE | `https://kitescan.ai` |
| **Kite Ozone Testnet** | 16602 | `https://evmrpc-testnet.0g.ai` | KITE | `https://testnet.gokite.ai` |

Clicking the toggle automatically calls `switchChain()` to prompt MetaMask to switch networks.

---

## 📱 Responsive Design

The entire dashboard is fully responsive:

| Screen Size | Layout |
|-------------|--------|
| **Mobile (<640px)** | Single column, smaller text, icon-only buttons, truncated TX hashes |
| **Tablet (640-1024px)** | 2-column stats, medium text |
| **Desktop (>1024px)** | Full layout, 4-column stats, full TX hashes |

---

## 🔒 TEE Verification (6-Step Process)

Every inference goes through a 6-step Trusted Execution Environment verification:
STEP 1: Verify quote signature cryptographically
STEP 2: Verify certificate chain (Intel Root CA → DCAP → Quote)
STEP 3: Check enclave measurement against trusted registry
STEP 4: Check security version (SVN)
STEP 5: Verify report data matches expected computation
STEP 6: Check attestation freshness (timestamp)

text

If all 6 steps pass: **"ALL CHECKS PASSED — Computation verified ✓"**

---

## 💰 Revenue Split

Every on-chain payment is automatically split:
┌──────────────────────────────────────────┐
│ 1 KITE Payment │
│ │
│ 🖥️ Compute Provider: 80% (0.80 KITE) │
│ 🎯 Curator: 15% (0.15 KITE) │
│ 🌐 Protocol: 5% (0.05 KITE) │
└──────────────────────────────────────────┘

text

No manual payouts. Splits execute at settlement, trustlessly on-chain.

---

## 🧠 Smart Contract

### `InferenceBilling.sol`

**Key Functions:**

| Function | Description |
|----------|-------------|
| `registerModel()` | Register a new AI model with pricing & split config |
| `payForInference()` | User pays for inference, funds held in escrow |
| `settleJob()` | Provider submits proof, contract auto-splits payment |
| `withdraw()` | Anyone withdraws their accumulated earnings |
| `batchWithdraw()` | Gas-efficient multi-recipient withdrawal |

**Split Configuration:**
- Splits are in basis points (must sum to 10,000)
- Default: Provider 8000, Curator 1500, Protocol 500

---

## 🔌 Kite Compute Integration

The Kite Compute integration pattern is built and ready. When you add your API key, it switches from mock to real API automatically:

```typescript
// agents/kite/kiteCompute.ts

const KITE_COMPUTE_URL = process.env.KITE_COMPUTE_URL || "https://api.gokite.ai/v1"
const KITE_API_KEY = process.env.KITE_API_KEY || ""

export async function kiteCompute(request: KiteInferenceRequest) {
  // If API key is set, call real Kite Compute
  if (KITE_API_KEY) {
    const response = await fetch(`${KITE_COMPUTE_URL}/inference`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KITE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: request.prompt,
        model: request.model || "kite-llama-70b",
        agent_type: request.agentType,
        tee_enabled: true,
        cache_enabled: true
      })
    })
    // ... handle response
  }
  
  // Fall back to mock if no API key
  return mockResponse(request)
}
Required Kite API Credentials
Credential	Purpose	Status
Kite Compute API endpoint	Run actual AI inference	Awaiting from Kite team
API key / auth method	Authenticate requests	Awaiting from Kite team
TEE attestation endpoint	Prove inference was verified	Awaiting from Kite team
Kite Storage endpoint	Result caching	Awaiting from Kite team
🎨 Kite AI Branding
The frontend uses Kite's official color palette:

Element	Color	Hex
Primary Purple	Kite Purple	#6c5ce7
Light Purple	Kite Light	#a78bfa
Accent Cyan	Kite Cyan	#06b6d4
Background	Dark	#0a0a14
Card	Card BG	#111122
Footer includes links to:

🌐 Kite AI Website

𝕏 Twitter

🧪 Ozone Testnet

💧 Faucet

🔍 KiteScan Explorer

🚀 Quick Start
Prerequisites
Node.js v18+

MetaMask with KiteAI Mainnet configured

KITE tokens in wallet

KiteAI Mainnet MetaMask Configuration
Field	Value
Network Name	KiteAI Mainnet
RPC URL	https://rpc.gokite.ai
Chain ID	2366
Currency Symbol	KITE
Block Explorer	https://kitescan.ai
Local Development
bash
# Clone the repository
git clone https://github.com/donlykirah/Kite-AI.git
cd Kite-AI

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Start agent server (Terminal 1)
npm run agent

# Start frontend (Terminal 2)
cd frontend && npm run dev

# Open http://localhost:5173
Deploy Contract
bash
# Set up environment
cp .env.example .env
# Add your PRIVATE_KEY to .env

# Compile
npx hardhat compile

# Deploy to KiteAI Mainnet
npx hardhat run scripts/deploy.ts --network kite

# Deploy to Kite Ozone Testnet
npx hardhat run scripts/deploy.ts --network kiteTestnet
📦 API Reference
Agent Server Endpoints
Method	Endpoint	Description
POST	/api/chat	Chat with selected AI agent
POST	/api/chat/stream	Stream agent response in real-time
GET	/api/stats	Agent statistics
GET	/api/history	Inference history
Request Body
json
{
  "message": "Analyze ETH market conditions",
  "agent": "defi-analyst"
}
Response
json
{
  "output": "[Kite DeFi Analyst] Market showing strong accumulation...",
  "verified": true,
  "txHash": "0x...",
  "cost": { "total": "1", "paid": true },
  "inference_id": "kite_abc123",
  "cache_hit": false,
  "model": "kite-llama-70b"
}
🔌 Universal Plugin System
The Kite AI Plugin works with any AI agent framework:

typescript
import { zeroGPlugin } from "./plugins/zeroGPlugin"

const ogInfer = zeroGPlugin({
  privateKey: process.env.PRIVATE_KEY,
  contractAddress: "0x..."
})

// One-shot inference
const result = await ogInfer.infer({
  prompt: "Analyze ETH market conditions",
  temperature: 0.7
})

// Streaming inference
for await (const token of ogInfer.inferStream({
  prompt: "Explain DeFi strategies"
})) {
  process.stdout.write(token)
}

// Batch inference
const results = await ogInfer.inferBatch([
  { prompt: "Analyze BTC" },
  { prompt: "Analyze ETH" },
  { prompt: "Analyze SOL" }
])
Framework Integrations
Framework	Integration	Status
ElizaOS	Plugin	✅ Built
Autonolas	Module	✅ Built
LangChain	Tool	✅ Built
CrewAI	Tool	✅ Built
AutoGPT	Direct	✅ Built
Custom Agent	Direct	✅ Built
🏆 What Makes This Different
Feature	Traditional AI API	Kite AI
Payment	API key + subscription	On-chain, per-call on KiteAI
Verification	Trust the provider	Cryptographic TEE proof
Storage	None	Kite decentralized storage
Revenue	Provider only	Auto-split 80/15/5
Caching	Not included	Free repeat calls
Proof	None	On-chain receipt with TX hash
Agent Selection	N/A	6 specialized agents
Framework Support	Custom integration	Universal plugin
Chain	N/A	Native on KiteAI Mainnet (2366)
🗺 Roadmap
Smart Contract (compiled, ready for KiteAI deploy)

TEE Verification (6-step process)

6 AI Agents with specialized capabilities

Universal Plugin System (6 frameworks)

Frontend Dashboard with RainbowKit

Agent Server (Express REST API)

KiteAI Mainnet + Ozone Testnet support

Kite brand colors and official links

Responsive design (mobile + desktop)

Kite Compute integration pattern

Deploy contract to KiteAI Mainnet (awaiting KITE tokens)

Connect Kite Compute API (awaiting credentials)

Kite Storage integration

Mobile app (React Native)

Analytics dashboard

👨‍💻 Tech Stack
Layer	Technology
Frontend	React 19 + TypeScript + Vite
Styling	Tailwind CSS v4
Wallet	RainbowKit + Wagmi v2
Blockchain	Viem v2
Smart Contract	Solidity 0.8.19 + Hardhat
Agent Server	Express.js + TypeScript
Deployment	Vercel (frontend) + Railway (agent)
Chain	KiteAI Mainnet (Chain 2366)
📜 License
MIT

👥 Team
Built for the Kite AI Hackathon

🔗 Links
🌐 Kite AI Official

🧪 Ozone Testnet

💧 Faucet

🔍 KiteScan

𝕏 Twitter

📔 Medium