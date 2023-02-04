<script setup lang="ts">
    import PoolCardContainer from "../components/poolCard/PoolCardContainer.vue";
    import PoolTableCard from "../components/poolCard/PoolTableCard.vue";
    import Table from "../components/tables/Table.vue";
    import poolData from "../assets/poolData";
    import GlowContainer from "../components/GlowContainer..vue";
</script>

<template>
    <div class="tw-max-w-5xl tw-mx-auto tw-flex tw-flex-col">
        <PoolCardContainer
            class="tw-mb-12"
            :poolData="poolData"
            sectionTitle="Trending Pools"
        />

        <GlowContainer class="tw-rounded-[21.2px] tw-p-[1.1px]">
            <Table class="cardBackground tw-rounded-3xl tw-p-8">
                <PoolTableCard />
                <PoolTableCard />
                <PoolTableCard />
                <PoolTableCard />
            </Table>
        </GlowContainer>
    </div>
</template>
