import { WagmiProvider, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

const kiteMainnet = {
  id: 2366,
  name: "KiteAI Mainnet",
  network: "kite-mainnet",
  iconUrl: "https://gokite.ai/favicon.ico",
  nativeCurrency: { name: "KITE", symbol: "KITE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.gokite.ai"] },
    public: { http: ["https://rpc.gokite.ai"] },
  },
  blockExplorers: {
    default: { name: "KiteScan", url: "https://kitescan.ai" },
  },
} as const

const kiteTestnet = {
  id: 16602,
  name: "Kite Ozone Testnet",
  network: "kite-testnet",
  iconUrl: "https://gokite.ai/favicon.ico",
  nativeCurrency: { name: "KITE", symbol: "KITE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://evmrpc-testnet.0g.ai"] },
    public: { http: ["https://evmrpc-testnet.0g.ai"] },
  },
  blockExplorers: {
    default: { name: "Kite Explorer", url: "https://testnet.gokite.ai" },
  },
  testnet: true,
} as const

const config = getDefaultConfig({
  appName: "Kite AI",
  projectId: "kite-ai-demo",
  chains: [kiteMainnet, kiteTestnet],
  transports: {
    [kiteMainnet.id]: http("https://rpc.gokite.ai"),
    [kiteTestnet.id]: http("https://evmrpc-testnet.0g.ai"),
  },
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export { kiteMainnet, kiteTestnet }