<script setup lang="ts">
import Navigation from "./components/nav/Navigation.vue";
import PoolCardContainer from "./components/poolCard/PoolCardContainer.vue";
import poolData from "./assets/poolData";

</script>


<template>
  <div>
    <Navigation />
    <PoolCardContainer
        :pool-data="poolData"
        section-title="Trending Pools"
    />
  </div>
</template>

<style scoped>

</style>
