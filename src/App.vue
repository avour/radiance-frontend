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

const wallets = [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
];

initWallet({ wallets, autoConnect: true });
onMounted(() => {
    initWorkspace();
});

</script>

<template>
    <router-view></router-view>
    <div id="modals"></div>
</template>


<style>
</style>
<!-- 
a:link {
    color: blue;
    background-color: transparent;
    text-decoration: underline;
} -->
