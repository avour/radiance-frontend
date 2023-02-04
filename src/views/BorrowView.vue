<script setup lang="ts">
    import borrowData from '../assets/borrowData';
    import InfoTile from '../components/InfoTile.vue';
</script>

<template>
    <div>
        <div class="tw-grid tw-grid-cols-2">
            <InfoTile v-for="info, i in borrowData" :key="i" :info="info" />
        </div>
    </div>
</template>
