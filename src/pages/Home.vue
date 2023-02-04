<script setup lang="ts">
    import PoolCardContainer from "../components/poolCard/PoolCardContainer.vue";
    import PoolTableCard from "../components/poolCard/PoolTableCard.vue";
    import poolData from "../assets/poolData";
</script>

<template>
    <PoolCardContainer
        :poolData="poolData"
        sectionTitle="Trending Pools"
    />
    <Table>
      <PoolTableCard />
      <PoolTableCard />
      <PoolTableCard />
      <PoolTableCard />
    </Table>
</template>
