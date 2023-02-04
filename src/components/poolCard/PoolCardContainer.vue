<script setup lang="ts">
import { useRouter } from 'vue-router';
import PoolCard from "./PoolCard.vue";

export interface Pool {
  id: number
  apr: number
  supply: string
  name: string
  image1: string
  image2: string

}

const router = useRouter()

defineProps<{ sectionTitle: string, poolData: Pool[] }>()

const onTapPool = (pool: Pool) => {
  router.push({
      name: 'pool-details',
      params: { id: pool.id, title: pool.name.replaceAll(/[^a-zA-Z0-9 ]/g,'').toLowerCase() },
    });
  }
</script>


<template>
  <div>
    <div class="section_title">
      <h2>{{sectionTitle}}</h2>
    </div>
    <section class="pool_card_container">
      <PoolCard
          v-for="pool, i in poolData"
          :key="i"
          :apr="pool.apr"
          :supply="pool.supply"
          :pairName="pool.name"
          :token1Image="pool.image1"
          :token2Image="pool.image2"
          @click="onTapPool(pool)"
      />
    </section>
  </div>
</template>


<style scoped>
  .section_title {
    color: black;
    /* margin-top: var(--gap1); */
    /* padding: .5rem var(--gutter); */
  }

  .pool_card_container {
    gap: var(--gap1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* padding: 0 var(--gutter) 2rem; */
  }
</style>
