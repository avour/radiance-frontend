<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"
import GlowContainer from '../components/GlowContainer..vue'

interface PoolFormData {
    marketID: string
    lpMint: string;
    baseMint: string
    quoteMint: string
}

const safetyMargin: string = "250%"
const liquidIncentive: string = "104%"
let formData: Ref<PoolFormData> = ref({
    marketID: "",
    lpMint: "",
    baseMint: "",
    quoteMint: ""
})

const onCreate = () => console.log(formData.value);

</script>

<template>
    <!-- <div class="tw-overflow-hidden tw-h-screen"> -->
    <div class="tw-flex tw-flex-col tw-items-center tw-p-10">
        <h2 class="tw-mb-5 tw-text-3xl tw-text-white tw-text-bold">Create Pool</h2>

        <GlowContainer class="tw-rounded-[21.2px] tw-p-[1.2px] tw-max-w-7xl tw-self-center">
            <div class="cardBackground tw-rounded-3xl tw-p-5 lg:tw-p-8">
                <div class="tw-flex tw-flex-col tw-gap-4 tw-mb-5">
                    <div class="tw-flex tw-gap-5">

                        <!-- Safety Margin -->
                        <div class="tw-flex tw-flex-col tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text mb-5">
                            <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>Safety Margin:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                            <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                                <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                    <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " :value="safetyMargin">
                                </div>
                            </div>
                        </div>

                        <!-- Liquidation Incentive -->
                        <div class="tw-flex tw-flex-col md:tw-items-end tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text mb-5">
                            <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>Liquidation Incentive:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                            <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                                <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                    <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " :value="liquidIncentive">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Market ID -->
                    <div class="tw-flex tw-flex-col tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text">
                        <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>Market ID:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                        <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                            <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " v-model="formData.marketID">
                            </div>
                        </div>
                    </div>

                    <!-- LP Mint -->
                    <div class="tw-flex tw-flex-col tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text">
                        <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>LP Mint:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                        <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                            <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " v-model="formData.lpMint">
                            </div>
                        </div>
                    </div>

                    <!-- Borrowable Base mint -->
                    <div class="tw-flex tw-flex-col tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text">
                        <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>Borrowable Base Mint:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                        <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                            <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " v-model="formData.baseMint">
                            </div>
                        </div>
                    </div>

                    <!-- Borrowable Quote Mint -->
                    <div class="tw-flex tw-flex-col tw-bg-green-400/10 tw-justify-between tw-rounded-xl mobile:tw-rounded-lg tw-py-3 tw-px-6 mobile:py-2 mobile:px-4 tw-cursor-text">
                        <div class="mobile:tw-text-sm tw-text-gray-300 tw-font-medium"><span>Borrowable Quote Mint:</span><span class="tw-ml-2"><i class="fal fa-info-circle"></i></span></div>
                        <div class="tw-flex tw-cursor-text tw-items-center tw-w-full tw-py-1 mobile:tw-py-1 tw-font-medium">
                            <div class="tw-flex tw-flex-grow tw-flex-shrink">
                                <input autocomplete="off" class="tw-w-full tw-text-gray-200 tw-grow tw-overflow-hidden tw-text-ellipsis tw-bg-transparent border-none tw-outline-none block " v-model="formData.quoteMint">
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="onCreate" class="tw-px-4 tw-py-3 tw-text-white tw-w-full tw-font-medium tw-rounded-xl tw-bg-gradient-to-r tw-from-[#20BF55] tw-to-[#01BAEF]">Connect Wallet</button>
            </div>
        </GlowContainer>
    </div>
    <!-- </div> -->
</template>
