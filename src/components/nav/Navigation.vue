<script setup lang="ts">
import { WalletMultiButton } from "solana-wallets-vue";
</script>


<template>
  <nav class="navigation">
    <div class="space_between">
      <h1><RouterLink to="/pools">RADIANCE</RouterLink></h1>
      <wallet-multi-button dark></wallet-multi-button>
    </div>
  </nav>
</template>


<style scoped>
  nav.navigation {
    padding: .4rem var(--gutter);
    background: var(--primaryColor);
    width: 100%;
  }

  .space_between div {
    width: 20%;
  }

  @media only screen and (max-width: 600px) {
    .space_between div {
      width: 50%;
    }
  }
</style>
