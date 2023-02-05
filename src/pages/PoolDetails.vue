<script setup lang="ts">
import { useRoute } from "vue-router"
import borrowData from "../assets/borrowData";
import poolData from "../assets/poolData"
import InfoTile from "../components/InfoTile.vue"
import GlowContainer from "../components/GlowContainer..vue";
import { Pool } from "../components/poolCard/PoolCardContainer.vue";
import { useWorkspace } from "../hooks/useWorkspace";
import { getPdaParams } from "@src/web3_utils";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import * as anchor from "@project-serum/anchor";
import { toast } from 'vue3-toastify';


import { ref } from 'vue';
enum Events {
    none,
    deposit,
    withdraw
}


const isShow = ref(false);
const amount = ref("");
const event = ref(Events.none)

function showModal() {
    isShow.value = true;
}

function closeModal() {
    isShow.value = false;
    console.log(amount);
    if (!amount.value || event.value == Events.none) {
        return
    }
    switch (event.value) {
        case Events.deposit:
            depositCollateral();
            break;
        case Events.withdraw:
            withdrawCollateral();
            break;
        default:
            break;
    }
    event.value = Events.deposit

}



const route = useRoute()
const workspace = useWorkspace();
const { program, wallet, provider } = workspace;

let pool: Pool = poolData.find((value): boolean => {
    return value.poolId == parseInt(route.params.id.toString());
})!

// let userCollateralConfig = await program.value account.userCollateralConfig.fetch(pda.userCollateralConfigKey);

const depositCollateral = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert);
        console.log(`Deposit Collateral`);

        let userLpTokenAccount = await getAssociatedTokenAddress(
            pool.lpMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.depositCollateral({
            poolId: pda.poolID,
            amount: new anchor.BN(amount.value)
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            collateralVault: pda.collateralVault,
            userCollecteralConfig: pda.userCollateralConfigKey,

            userLpTokenAccount: userLpTokenAccount,
            lpMint: pool.lpMint,
            user: wallet.value!.publicKey,

            serumMarket: pool.serumMakert,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
            .rpc();
    } catch (error) {
        console.log(`Transaction Error\n${error}`)
        toast.remove(toastId)
        await new Promise(resolve => setTimeout(resolve, 10));
        toast.error(`Transaction Error\n${error}`, {
            autoClose: 9000
        })
        return;
    }

    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Deposit Successful\nView on SolScan <a href='https://solscan.io/tx/${signature}?cluster=devnet' target='_blank'>view</a>`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}


const withdrawCollateral = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert);
        console.log(`Deposit Collateral`);

        let userLpTokenAccount = await getAssociatedTokenAddress(
            pool.lpMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.withdrawCollateral({
            poolId: pda.poolID,
            amount: new anchor.BN(amount.value)
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            collateralVault: pda.collateralVault,
            userCollecteralConfig: pda.userCollateralConfigKey,

            userLpTokenAccount: userLpTokenAccount,
            lpMint: pool.lpMint,
            user: wallet.value!.publicKey,
            serumMarket: pool.serumMakert,

            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
            .rpc();
    } catch (error) {
        console.log(`Transaction Error\n${error}`)
        toast.remove(toastId)
        await new Promise(resolve => setTimeout(resolve, 10));
        toast.error(`Transaction Error\n${error}`, {
            autoClose: 9000
        })
        return;
    }

    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Deposit Successful\nView on SolScan <a href='https://solscan.io/tx/${signature}?cluster=devnet' target='_blank'>view</a>`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}

const quoteConfig = [
    {
        name: "Total Supply",
        value: 2342564,
        type: "currency"
    },
    {
        name: "Total Borrow",
        value: 242349,
        type: "currency"
    },
    {
        name: "Utilization Rate",
        value: 58,
        type: "percent"
    },
    {
        name: "Supply APR",
        value: 8.6,
        type: "percent"
    },
    {
        name: "Borrow APR",
        value: 10.4,
        type: "percent"
    },
]
const baseConfig = [
    {
        name: "Total Supply",
        value: 2342564,
        type: "currency"
    },
    {
        name: "Total Borrow",
        value: 242349,
        type: "currency"
    },
    {
        name: "Utilization Rate",
        value: 58,
        type: "percent"
    },
    {
        name: "Supply APR",
        value: 8.6,
        type: "percent"
    },
    {
        name: "Borrow APR",
        value: 10.4,
        type: "percent"
    },
]

</script>

<template>
    <div class="tw-overflow-hidden tw-h-">
        <div class="tw-flex tw-flex-col tw-h-full tw-relative cardBackground" style="overflow: hidden">
            <div class="tw-flex tw-flex-col tw-grow tw-h-full tw-p-12">
                <!-- <div class="tw-flex tw-flex-col tw-h-[50%] radialBackground tw-absolute tw-top-1/4 tw-right-1/2">
                    <div class="tw-w-50"></div>
                </div> -->
                <GlowContainer
                    class="tw-w-[min(700px,150%)] tw-relative tw-self-center tw-mb-12 tw-rounded-3xl tw-p-[1.1px]">
                    <div class="cardBackground tw-py-8 tw-px-6 tw-rounded-3xl">
                        <div class="tw-grid tw-grid-cols-2 tw-text-gray-200 tw-divide-x tw-divide-gray-600">
                            <div class="tw-flex tw-flex-col tw-pr-4">
                                <p class="tw-text-lg tw-text-white tw-font-semiBold">{{ pool.baseName }}</p>
                                <div v-for="data in quoteConfig"
                                    class="tw-flex tw-justify-between tw-py-3 tw-border-b tw-border-gray-500">
                                    <p>{{ data.name }}</p>
                                    <p v-if="data.type == 'currency'">{{
                                        Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(data.value)
                                    }}</p>
                                    <p v-else>{{ data.value }}%</p>
                                </div>
                            </div>
                            <div class="tw-flex tw-flex-col tw-pl-4">
                                <p class="tw-text-lg tw-text-white tw-font-semiBold">{{ pool.quoteName }}</p>
                                <div v-for="data in baseConfig"
                                    class="tw-flex tw-justify-between tw-py-3 tw-border-b tw-border-gray-500">
                                    <p>{{ data.name }}</p>
                                    <p v-if="data.type == 'currency'">{{
                                        Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(data.value)
                                    }}</p>
                                    <p v-else>{{ data.value }}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowContainer>

                <!-- Switch Tab -->
                <tabs
                    :options="{ useUrlFragment: false }"
                    wrapper-class="tw-self-center"
                    panel-class="tw-w-[min(700px,150%)] tw-self-center tw-no-underline"
                    nav-item-class="tw-px-4 tw-py-2 tw-rounded-3xl tw-no-underline"
                    nav-item-link-class="tw-no-underline tw-text-grey-900 tw-text-sm tw-font-semiBold  tw-text-white"
                    nav-item-link-disabled-class="tw-no-underline"
                    nav-item-active-class="tw-rounded-3xl tw-bg-gradient-to-r tw-from-[#20BF55] tw-to-[#01BAEF]"
                    nav-class="tw-flex tw-flex-grow-0 tw-justify-center tw-mb-8 tw-gap-1 tw-rounded-full tw-p-1 cardBackground"
                    >
                    <tab name="Borrow">
                        <GlowContainer class="tw-rounded-[21.2px] tw-p-[1px] tw-self-center">
                            <Modal v-model="isShow" :close="closeModal">
                                <div class="modal ">
                                    <p class="tw-mb-2">Enter Amount</p>

                                    <div class="input_container">
                                        <input class="input" v-model="amount" placeholder="Input Amount" />
                                    </div>
                                    <button @click="closeModal"
                                        class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg tw-mt-4">Continue</button>
                                </div>
                            </Modal>
                            <div
                                class="cardBackground tw-h-full tw-w-full tw-py-8 tw-px-6 tw-rounded-3xl tw-p-5 tw-overflow-hidden">
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
                                                        <div
                                                            class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                            <button @click="() => { event = Events.deposit; showModal() }"
                                                                class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Deposit</button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                            <button @click="() => { event = Events.withdraw; showModal() }"
                                                                class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Withdraw</button>
                                                            <!-- <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Leverage</button> -->
                                                            <!-- <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Delvage</button> -->
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>MATIC</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>USDT</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </GlowContainer>
                    </tab>
                    <tab name="Lend">
                        <GlowContainer class="tw-rounded-[21.2px] tw-p-[1px] tw-self-center">
                            <Modal v-model="isShow" :close="closeModal">
                                <div class="modal ">
                                    <p class="tw-mb-2">Enter Amount</p>

                                    <div class="input_container">
                                        <input class="input" v-model="amount" placeholder="Input Amount" />
                                    </div>
                                    <button @click="closeModal"
                                        class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg tw-mt-4">Continue</button>
                                </div>
                            </Modal>
                            <div
                                class="cardBackground tw-h-full tw-w-full tw-py-8 tw-px-6 tw-rounded-3xl tw-p-5 tw-overflow-hidden">
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
                                                    <td>USDC/SOL</td>
                                                    <td>
                                                        <p class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</p>
                                                        <p class="tw-text-medium">$0</p>
                                                    </td>
                                                    <td>
                                                        <p class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</p>
                                                        <p class="tw-text-medium">$0</p>
                                                    </td>
                                                    <td>
                                                        <div
                                                            class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                            <button @click="() => { event = Events.deposit; showModal() }"
                                                                class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Deposit</button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                            <button
                                                                @click="() => { event = Events.withdraw; showModal() }"
                                                                class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Withdraw</button>
                                                            <!-- <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Leverage</button> -->
                                                            <!-- <button class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Delvage</button> -->
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>MATIC</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>USDT</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed</span><br />
                                                        <span class="tw-text-medium">$0</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </GlowContainer>
                    </tab>
                </tabs>


            </div>
        </div>
    </div>
</template>

<style scoped>
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

.modal {
    width: 400px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 20px;
    text-align: center;
}
</style>
