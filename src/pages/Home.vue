<script setup lang="ts">
    import PoolCardContainer from "../components/poolCard/PoolCardContainer.vue";
    import poolData from "../assets/poolData";
</script>

<template>
    <PoolCardContainer
        :poolData="poolData"
        sectionTitle="Trending Pools"
    />
</template>
