<script setup lang="ts">
    import Tooltip from "../components/Tooltip.vue";

    export interface Info {
        label: string
        description: string
        value: string
    }

    defineProps<{ info: Info }>()
</script>

<template>
    <div>
        <p class="tw-text-sm tw-text-gray-300 tw-leading-tight">
            <span>{{ info.label }}</span>
            <span class="tw-ml-1">
                <button href="#" v-tooltip="info.description">
                    <i class="fal fa-info-circle"></i>
                </button>
            </span>
        </p>
        <p class="tw-text-lg tw-text-gray-100">{{ info.value }}</p>
    </div>
</template>
