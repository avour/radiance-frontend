import SolanaWallets from "solana-wallets-vue"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: true,
};

export { SolanaWallets, walletOptions }