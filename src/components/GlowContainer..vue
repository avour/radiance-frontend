<template>
    <div class="tw-isolate radialBackground tw-relative">
        <slot></slot>
    </div>
</template>


<style scoped>
.radialBackground {
    background-image: linear-gradient(246deg, #01BAEF 7.97%, #63D471 49.17%, #20BF55 92.1%) !important;
}

.radialBackground::after, .radialBackground::before {
    content: "";
    position: absolute !important;
    top: 15px !important;
    bottom: 15px !important;
    z-index: -1 !important;
    pointer-events: none !important;
    width: 60% !important;
    border-radius: 50% !important;
    opacity: .45 !important;
    mix-blend-mode: hard-light !important;
}

.radialBackground::before {
    left: 15px !important;
    background-color: #20BF55 !important;
    box-shadow: 0 0 140px 55px #20BF55aa !important;
}

.radialBackground::after {
    right: 15px !important;
    background-color: #01BAEF !important;
    box-shadow: 0 0 140px 55px #01BAEFaa !important;
}
.radialBackground::after, .radialBackground::before {
    content: "";
    position: absolute;
    top: 15px;
    bottom: 15px;
    z-index: -1;
    pointer-events: none;
    width: 60% !important;
    border-radius: 50%;
    opacity: .45;
    mix-blend-mode: hard-light !important;
}
</style>
