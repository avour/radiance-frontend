import SolanaLogo from "./Solana_logo.png"
import USDCLogo from "./usd-coin.png"
import BtcLogo from "./Bitcoin-BTC-icon.png"
import Usdt from "./Tether-USDT-icon.png"
import Dot from "./polkadot-cryptocurrency-icon-512x512-ya19nwgb.png"
import Raydium from "./Raydium-RAY-coin.png"
import { PublicKey } from '@solana/web3.js';


const poolData = [
    {
        poolId: 1675608413,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Cgk42VD6jbN1S7FTjZgMvWTkEJ17D9a3GyaC3Ng2X7vX"),
        borrowableBaseMint: new PublicKey("GNijf6kWp6juB91VcbsJ9iABrhjq3pKSTbQqWjMEzV6X"),
        borrowableQuoteMint: new PublicKey("E4zt1vi9m9qLcA6DdT7xHhRz9hAUDw4HPHQcdEmSdnsR"),
        baseRadianceMint: new PublicKey("MXsacZWE1qmq9W9qtVjVKguRsqW8ipgN7XvjZXs8vd4"),
        quoteRadianceMint: new PublicKey("GE2gYqP46VBJyBvP8kz6Kseudx4SPxtwXd15XEvUmXEU"),

        name: "SOL/USDT", image1: SolanaLogo, image2: Usdt, supply: "2,534,000", apr: 12,
        baseName: "Solana (SOL)",
        quoteName: "Tether USD (USDT)"
    },
    {
        poolId: 1675627232,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("CcEuJfbfAdgmWPb2AP64qtUzDzQi9aXKuEja2vUcGDqm"),
        borrowableBaseMint: new PublicKey("66bZrqWFUnmt95ZsjiYuVzWz7LjX7HtZJWEUv3Aeg69k"),
        borrowableQuoteMint: new PublicKey("BPmEkbgHgFDsUoGX2Jgz4DM4n2pSAuABLaoMDyztjxc"),
        baseRadianceMint: new PublicKey("MXsacZWE1qmq9W9qtVjVKguRsqW8ipgN7XvjZXs8vd4"),
        quoteRadianceMint: new PublicKey("GE2gYqP46VBJyBvP8kz6Kseudx4SPxtwXd15XEvUmXEU"),
        name: "WBTC/USDC", image1: BtcLogo, image2: USDCLogo, supply: "2,534,000", apr: 18,
        baseName: "Wrapped Bitcoin (WBTC)",
        quoteName: "USDC Circle (USDC)"
    },
    {
        poolId: 32242323,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        borrowableBaseMint: new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums"),
        borrowableQuoteMint: new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR"),
        baseRadianceMint: new PublicKey("MXsacZWE1qmq9W9qtVjVKguRsqW8ipgN7XvjZXs8vd4"),
        quoteRadianceMint: new PublicKey("GE2gYqP46VBJyBvP8kz6Kseudx4SPxtwXd15XEvUmXEU"),
        name: "RAY/USDC", image1: Raydium, image2: USDCLogo, supply: "2,534,000", apr: 7,
        baseName: "Raydium (RAY)",
        quoteName: "USDC Circle (USDC)"
    },
    {
        poolId: 2322242323,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        borrowableBaseMint: new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums"),
        borrowableQuoteMint: new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR"),
        baseRadianceMint: new PublicKey("MXsacZWE1qmq9W9qtVjVKguRsqW8ipgN7XvjZXs8vd4"),
        quoteRadianceMint: new PublicKey("GE2gYqP46VBJyBvP8kz6Kseudx4SPxtwXd15XEvUmXEU"),
        name: "DOT/USDC", image1: Dot, image2: USDCLogo, supply: "2,534,000", apr: 7,
        baseName: "Polkadot (DOT)",
        quoteName: "USDC Circle (USDC)"
    },
]

export default poolData
