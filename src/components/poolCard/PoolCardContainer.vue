<script setup lang="ts">
import PoolCard from "./PoolCard.vue";

defineProps<{ sectionTitle: string, poolData: object }>()
</script>


<template>
  <div class="section_title">
    <h2>{{sectionTitle}}</h2>
  </div>
  <section class="pool_card_container">
    <PoolCard
        v-for="pool in poolData"
        :key="pool"
        :apr="pool.apr"
        :supply="pool.supply"
        :pair-name="pool.name"
        :token1-image="pool.image1"
        :token2-image="pool.image2"
    />
  </section>
</template>


<style scoped>
  .section_title {
    color: black;
    margin-top: var(--gap1);
    padding: .5rem var(--gutter);
  }

  .pool_card_container {
    gap: var(--gap1);
    display: flex;
    flex-wrap: wrap;
    padding: 0 var(--gutter) 2rem;
  }
</style>
