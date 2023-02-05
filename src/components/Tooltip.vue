<template>
    <a href="#" class="transition duration-150 ease-in-out"
      data-bs-toggle="tooltip" :title="text">
        <slot></slot>
    </a>
</template>

<script setup lang="ts">
    defineProps<{ text: string }>()

    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    // var toolto
</script>
