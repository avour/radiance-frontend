import SolanaLogo from "./Solana_logo.png"
import USDCLogo from "./usd-coin.png"
import { PublicKey } from '@solana/web3.js';


const poolData = [
    {
        poolId: 1675608413,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Cgk42VD6jbN1S7FTjZgMvWTkEJ17D9a3GyaC3Ng2X7vX"),
        borrowableBaseMint: new PublicKey("GNijf6kWp6juB91VcbsJ9iABrhjq3pKSTbQqWjMEzV6X"),
        borrowableQuoteMint: new PublicKey("E4zt1vi9m9qLcA6DdT7xHhRz9hAUDw4HPHQcdEmSdnsR"),
        name: "SOL/USD", image1: SolanaLogo, image2: USDCLogo, supply: "2,534,000", apr: 12,
    },
    {
        poolId: 32322443,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        borrowableBaseMint: new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums"),
        borrowableQuoteMint: new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR"),
        name: "BTC/USD", image1: SolanaLogo, image2: USDCLogo, supply: "2,534,000", apr: 18
    },
    {
        poolId: 32242323,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        borrowableBaseMint: new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums"),
        borrowableQuoteMint: new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR"),
        name: "AVAX/USD", image1: SolanaLogo, image2: USDCLogo, supply: "2,534,000", apr: 7
    },
    {
        poolId: 2322242323,
        serumMakert: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        lpMint: new PublicKey("Af4W1HNpMqzVyFmTxa3aWUWQUyKzmDAGoU819Prbsapv"),
        borrowableBaseMint: new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums"),
        borrowableQuoteMint: new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR"),
        name: "AVAX/USD", image1: SolanaLogo, image2: USDCLogo, supply: "2,534,000", apr: 7
    },
]

export default poolData
