<script setup lang="ts">
import Navigation from "./components/nav/Navigation.vue";
import PoolCardContainer from "./components/poolCard/PoolCardContainer.vue";
import poolData from "./assets/poolData";
import Table from "./components/tables/Table.vue";
import PoolTableCard from "./components/poolCard/PoolTableCard.vue";

</script>


<template>
  <div>
    <Navigation />
    <PoolCardContainer
        :pool-data="poolData"
        section-title="Trending Pools"
    />
    <Table>
      <PoolTableCard />
      <PoolTableCard />
      <PoolTableCard />
      <PoolTableCard />
    </Table>
  </div>
</template>

<style scoped>

</style>
