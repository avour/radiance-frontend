<script setup lang="ts">
import { useRoute } from "vue-router"
import borrowData from "../assets/borrowData";
import poolData from "../assets/poolData"
import InfoTile from "../components/InfoTile.vue"
import { Pool } from "../components/poolCard/PoolCardContainer.vue";

const route = useRoute()

let activePool: Pool | undefined = poolData.find((value): boolean => {
    return value.id == parseInt(route.params.id.toString());
})

// let activeTab: number = ref(0);

</script>

<template>
    <div class="tw-overflow-hidden tw-h-">
        <div class="tw-flex tw-flex-col tw-h-full tw-relative cardBackground" style="overflow: hidden">
            <div class="tw-flex tw-flex-col tw-grow tw-h-full tw-isolate tw-p-12">
                <!-- <div class="tw-flex tw-flex-col tw-h-[50%] radialBackground tw-absolute tw-top-1/4 tw-right-1/2">
                    <div class="tw-w-50"></div>
                </div> -->
                <div class="tw-w-[min(700px,150%)] tw-relative tw-self-center tw-mb-24 cardBackground tw-rounded-3xl tw-py-8 tw-px-6 ">
                    <div class="tw-grid tw-grid-cols-2 tw-text-gray-200 tw-divide-x tw-divide-gray-600">
                        <div class="tw-flex tw-flex-col tw-pr-4">
                            <p class="tw-text-lg tw-text-white tw-font-semiBold">Polygon Matic</p>
                            <div v-for="data in poolData" class="tw-flex tw-justify-between tw-py-3 tw-border-b tw-border-gray-500">
                                <p>{{ data.name }}</p>
                                <p>{{ data.supply }}</p>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-col tw-pl-4">
                            <p class="tw-text-lg tw-text-white tw-font-semiBold">(PoS) Tether USD (USDT)</p>
                            <div v-for="data in poolData" class="tw-flex tw-justify-between tw-py-3 tw-border-b tw-border-gray-500">
                                <p>{{ data.name }}</p>
                                <p>{{ data.supply }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Switch Tab -->
                <div class="tw-flex tw-flex-none tw-self-center tw-mb-8 tw-gap-1 tw-rounded-full tw-p-1 tw-text-grey-900 tw-text-sm tw-font-semiBold  tw-text-white cardBackground">
                    <button class="tw-px-4 tw-py-2 tw-rounded-3xl tw-bg-gradient-to-r tw-from-[#20BF55] tw-to-[#01BAEF]">Borrow</button>
                    <button class="tw-px-4 tw-py-2">Lend</button>
                </div>

                <div class="tw-w-[min(700px,150%)]  radialBackground tw-relative  tw-rounded-[21.2px]  tw-p-[1px] tw-self-center">
                    <div class="cardBackground tw-h-full tw-w-full tw-py-8 tw-px-6 tw-rounded-3xl tw-p-5 tw-overflow-hidden">
                        <div class="tw-w-full tw-flex tw-flex-col tw-rounded-xl tw-p-5">
                            <div class="tw-w-full tw-grid tw-grid-cols-4 tw-gap-5 tw-mb-3">
                                <div v-for="info, i in borrowData" :key="i">
                                    <InfoTile :info="info" />
                                </div>
                            </div>
                            <div class="tw--gray-800 tw-border-t tw-border-gray-600 tw-my-3"></div>
                            <!-- Info Table -->
                            <div class="tw-w-full tw-mb-3 tw-text-gray-100">
                                <table class="infoTable tw-w-full tw-table-auto tw-border-collapse">
                                    <tbody>
                                        <tr class="tw-border-b tw-border-gray-600">
                                            <td>USDT/MATIC</td>
                                            <td>
                                                <p class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</p>
                                                <p class="tw-text-medium">$0</p>
                                            </td>
                                            <td>
                                                <p class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</p>
                                                <p class="tw-text-medium">$0</p>
                                            </td>
                                            <td>
                                                <div class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                    <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Deposit</button>
                                                    <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Withdraw</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                    <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Leverage</button>
                                                    <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Delvage</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="tw-border-b tw-border-gray-600">
                                            <td>MATIC</td>
                                            <td>
                                                <span class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br/>
                                                <span class="tw-text-medium">$0</span>
                                            </td>
                                            <td>
                                                <span class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br/>
                                                <span class="tw-text-medium">$0</span>
                                            </td>
                                            <td class="end">
                                                <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                            </td>
                                            <td class="end">
                                                <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                            </td>
                                        </tr>
                                        <tr class="tw-border-b tw-border-gray-600">
                                            <td>USDT</td>
                                            <td>
                                                <span class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br/>
                                                <span class="tw-text-medium">$0</span>
                                            </td>
                                            <td>
                                                <span class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br/>
                                                <span class="tw-text-medium">$0</span>
                                            </td>
                                            <td class="end">
                                                <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                            </td>
                                            <td class="end">
                                                <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.radialBackground {
    background-image: linear-gradient(246deg, #01BAEF 7.97%, #63D471 49.17%, #20BF55 92.1%) !important;
}

.cardBackground {
    background-image: linear-gradient(140.14deg,rgba(0,182,191,.2),rgba(27,22,89,.15) 86.61%),linear-gradient(321.82deg,#314338, #233329) !important;
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

.infoTable tr td {
    padding: 8px 0px;
}

.infoTable tr td.end {
    padding: 5px 0px;
    text-align: end;
}

.infoTable tr td.center {
    padding: 5px 0px;
    text-align: center;
}
</style>
