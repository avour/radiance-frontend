<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { initWallet } from 'solana-wallets-vue';
import { initWorkspace } from './hooks/';
import { onMounted } from 'vue';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const route = useRoute();
const wallets = [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),

];

initWallet({ wallets, autoConnect: true });
onMounted(() => {
    initWorkspace();
});
// import { useRoute } from 'vue-router';
// import { initWorkspace } from './hooks/';
// import { onMounted } from 'vue';
// import { initWallet } from 'solana-wallets-vue';
// import { SolanaWallets, walletOptions } from "./plugins/SolanaWallet"

// const route = useRoute();

// const wallets  = walletOptions.wallets;
// initWallet({ wallets, autoConnect: true });
// onMounted(() => {
//     initWorkspace();
// });
</script>

<template>
    <router-view></router-view>
</template>


<style>
a:link {
    color: blue;
    background-color: transparent;
    text-decoration: underline;
  }

</style>