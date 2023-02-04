<script setup lang="ts">
import Navigation from "../components/nav/Navigation.vue";

</script>

<template>
    <div class="cardBackground">
        <Navigation class="tw-sticky tw-top-0 tw-z-10 tw-w-full" />
        <RouterView />
    </div>
</template>

<style>
    .cardBackground {
        background-image: linear-gradient(140.14deg,rgba(0,182,191,.3),rgba(27,22,89,.2) 86.61%),linear-gradient(321.82deg,#314338, #233329) !important;
    }

</style>
