<script setup lang="ts">
import { useRoute } from "vue-router"
import borrowData from "../assets/borrowData";
import poolData from "../assets/poolData"
import InfoTile from "../components/InfoTile.vue"
import GlowContainer from "../components/GlowContainer..vue";
import { Pool } from "../components/poolCard/PoolCardContainer.vue";
import { useWorkspace } from "../hooks/useWorkspace";
import { createUserAssociatedTokenAccount, getPdaParams } from "@src/web3_utils";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import * as anchor from "@project-serum/anchor";
import { toast } from 'vue3-toastify';
import { onMounted } from 'vue';


import { ref } from 'vue';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { min } from "bn.js";

enum Events {
    none,
    deposit,
    withdraw,
    borrowQuote,
    borrowBase,
    repayQuote,
    repayBase,
    supplyQuote,
    supplyBase,
    withdrawQuote,
    withdrawBase,
}


const isShow = ref(false);
const amount = ref("");
const event = ref(Events.none)
const collateralDeposited = ref(0)
const baseBorrowedAmount = ref(0)
const quoteBorrowedAmount = ref(0)
const baseLoanedAmount = ref(0)
const quoteLoanedAmount = ref(0)

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
        case Events.borrowBase:
            borrow();
            break;
        case Events.borrowQuote:
            borrow();
            break;
        case Events.repayBase:
            repayLoan();
            break;
        case Events.repayQuote:
            repayLoan();
            break;
        case Events.supplyBase:
            supplyBorrowable();
            break;
        case Events.supplyQuote:
            supplyBorrowable()
            break;
        case Events.withdrawBase:
            withdrawBorrowable();
            break;
        case Events.withdrawQuote:
            withdrawBorrowable();
            break;

        default:
            break;
    }
    event.value = Events.deposit

}


const route = useRoute()
const workspace = useWorkspace();
const { program, wallet, provider, connection } = workspace;

let pool: Pool = poolData.find((value): boolean => {
    return value.poolId == parseInt(route.params.id.toString());
})!

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 10));
    reloadAccounts();
});


const reloadAccounts = async () => {
    const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert);
    let userCollateralConfig = await program.value.account.userCollateralConfig.fetch(pda.userCollateralConfigKey);
    collateralDeposited.value = userCollateralConfig.collateralDeposited.toNumber() / LAMPORTS_PER_SOL
    baseBorrowedAmount.value = userCollateralConfig.baseBorrowedAmount.toNumber() / LAMPORTS_PER_SOL
    quoteBorrowedAmount.value = userCollateralConfig.quoteBorrowedAmount.toNumber() / LAMPORTS_PER_SOL

    try {
        let userBorrowableTokenAccount1 = await getAssociatedTokenAddress(
            pool.baseRadianceMint, // should be radiance mint
            wallet.value!.publicKey
        );
        const account1 = await getAccount(connection, userBorrowableTokenAccount1, undefined, TOKEN_PROGRAM_ID);
        baseLoanedAmount.value = parseInt(account1.amount.toString()) / LAMPORTS_PER_SOL;

    } catch (error) {

    }
    try {

        let userBorrowableTokenAccount2 = await getAssociatedTokenAddress(
            pool.quoteRadianceMint,
            wallet.value!.publicKey
        );
        const account2 = await getAccount(connection, userBorrowableTokenAccount2, undefined, TOKEN_PROGRAM_ID);
        quoteLoanedAmount.value = parseInt(account2.amount.toString()) / LAMPORTS_PER_SOL;
    } catch (error) {

    }



}

const getSolScanLink = (signature: string): string => {
    return `<a style="color:blue; text-decoration: underline;" href='https://solscan.io/tx/${signature}?cluster=devnet' target='_blank'>view</a>`
}

const depositCollateral = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        console.log(`Deposit Collateral`);
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert);

        let userLpTokenAccount = await getAssociatedTokenAddress(
            pool.lpMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.depositCollateral({
            poolId: pda.poolID,
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL)
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Deposit Successful\nView on SolScan ${getSolScanLink(signature)}`, {
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
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL)
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Withdraw Successful\nView on SolScan ${getSolScanLink(signature)}`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}

const borrow = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert, pool.borrowableBaseMint, pool.borrowableQuoteMint);
        console.log(`Taking Loan...`);

        // let userBorrowableTokenAccount = await createUserAssociatedTokenAccount(
        //     workspace,
        //     event.value == Events.borrowBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
        // );
        let userBorrowableTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.borrowBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.borrow({
            poolId: pda.poolID,
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL),
            mintType: event.value == Events.borrowBase ? { base: {} } : { quote: {} },
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            userCollecteralConfig: pda.userCollateralConfigKey,
            borrowableMint: event.value == Events.borrowBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            userBorrowableTokenAccount: userBorrowableTokenAccount,
            borrowableVault: event.value == Events.borrowBase ? pda.borrowableBaseVault : pda.borrowableQuoteVault,
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Loan Successful\nView on SolScan ${getSolScanLink(signature)}`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}


const repayLoan = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert, pool.borrowableBaseMint, pool.borrowableQuoteMint);
        console.log(`Repaying Loan...`);

        let userBorrowableTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.repayBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.repayLoan({
            poolId: pda.poolID,
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL),
            mintType: event.value == Events.repayBase ? { base: {} } : { quote: {} },
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            userCollecteralConfig: pda.userCollateralConfigKey,
            borrowableVault: event.value == Events.repayBase ? pda.borrowableBaseVault : pda.borrowableQuoteVault,
            borrowableMint: event.value == Events.repayBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,

            userBorrowableTokenAccount: userBorrowableTokenAccount,
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Loan Repayment Successful\nView on SolScan ${getSolScanLink(signature)}`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}

const supplyBorrowable = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert, pool.borrowableBaseMint, pool.borrowableQuoteMint);
        console.log(`Supplying Borrowable...`);

        let userBorrowableTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.supplyBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            wallet.value!.publicKey
        );

        let userRadianceTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.supplyBase ? pool.baseRadianceMint : pool.quoteRadianceMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.supplyBorrowable({
            poolId: pda.poolID,
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL),
            mintType: event.value == Events.supplyBase ? { base: {} } : { quote: {} },
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            borrowableVault: event.value == Events.supplyBase ? pda.borrowableBaseVault : pda.borrowableQuoteVault,
            borrowableMint: event.value == Events.supplyBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            radianceMint: event.value == Events.supplyBase ? pool.baseRadianceMint : pool.quoteRadianceMint,
            userRadianceTokenAccount: userRadianceTokenAccount,
            userBorrowableTokenAccount: userBorrowableTokenAccount,
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Deposit Successful\nView on SolScan ${getSolScanLink(signature)}`, {
        autoClose: 9000,
        dangerouslyHTMLString: true,
    })
}

const withdrawBorrowable = async () => {

    const toastId = toast.loading('Processing Transaction...');
    let signature = '';

    try {
        // const poolId = parseInt((Date.now() / 1000).toString());
        const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert, pool.borrowableBaseMint, pool.borrowableQuoteMint);
        console.log(`Repaying Loan...`);

        let userBorrowableTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.withdrawBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            wallet.value!.publicKey
        );

        let userRadianceTokenAccount = await getAssociatedTokenAddress(
            event.value == Events.supplyBase ? pool.baseRadianceMint : pool.quoteRadianceMint,
            wallet.value!.publicKey
        );

        // Initialize mint account and fund the account
        signature = await program.value.methods.withdrawBorrowable({
            poolId: pda.poolID,
            amount: new anchor.BN(parseInt(amount.value) * LAMPORTS_PER_SOL),
            mintType: event.value == Events.withdrawBase ? { base: {} } : { quote: {} },
        }).accounts({
            lendingPool: pda.lendingPoolKey,
            borrowableVault: event.value == Events.withdrawBase ? pda.borrowableBaseVault : pda.borrowableQuoteVault,
            borrowableMint: event.value == Events.withdrawBase ? pool.borrowableBaseMint : pool.borrowableQuoteMint,
            radianceMint: event.value == Events.withdrawBase ? pool.baseRadianceMint : pool.quoteRadianceMint,
            userRadianceTokenAccount: userRadianceTokenAccount,
            userBorrowableTokenAccount: userBorrowableTokenAccount,
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

    reloadAccounts();
    toast.remove(toastId)
    await new Promise(resolve => setTimeout(resolve, 10));
    toast.success(`Withdraw Successful\nView on SolScan ${getSolScanLink(signature)}`, {
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
                <tabs :options="{ useUrlFragment: false }" wrapper-class="tw-self-center"
                    panel-class="tw-w-[min(700px,150%)] tw-self-center tw-no-underline"
                    nav-item-class="tw-px-4 tw-py-2 tw-rounded-3xl tw-no-underline"
                    nav-item-link-class="tw-no-underline tw-text-grey-900 tw-text-sm tw-font-semiBold  tw-text-white"
                    nav-item-link-disabled-class="tw-no-underline"
                    nav-item-active-class="tw-rounded-3xl tw-bg-gradient-to-r tw-from-[#20BF55] tw-to-[#01BAEF]"
                    nav-class="tw-flex tw-flex-grow-0 tw-justify-center tw-mb-8 tw-gap-1 tw-rounded-full tw-p-1 cardBackground">
                    <tab name="Borrow">
                        <GlowContainer class="tw-rounded-[21.2px] tw-p-[1px] tw-self-center">
                            <Modal v-model="isShow" :close="()=> {isShow = false}">
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
                                                    <td>Collateral (LP Token)</td>
                                                    <td>
                                                        <p class="tw-text-sm tw-text-gray-300 tw-leading-tighter">
                                                            Deposited:</p>
                                                    </td>
                                                    <td>
                                                        <p class="tw-text-medium">{{
                                                            Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(collateralDeposited)
                                                        }}</p>
                                                    </td>
                                                    <td>
                                                        <div
                                                            class="tw-flex tw-flex-col tw-gap-[5px] tw-items-end tw-justify-center">
                                                            <button
                                                                @click="() => { event = Events.deposit; showModal() }"
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
                                                    <td>{{ pool.baseName }}</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed:</span><br />
                                                    </td>
                                                    <td>
                                                        <span class="tw-text-medium">{{
                                                            Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(baseBorrowedAmount)
                                                        }}</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.borrowBase; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button @click="() => { event = Events.repayBase; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Repay</button>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>{{ pool.quoteName }}</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Borrowed:</span><br />
                                                    </td>
                                                    <td>
                                                        <span class="tw-text-medium">{{
                                                            Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(quoteBorrowedAmount)
                                                        }}</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.borrowQuote; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Borrow</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.repayQuote; showModal() }"
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
                                                    <td>{{ pool.baseName }}</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                    </td>
                                                    <td>
                                                        <span class="tw-text-medium">{{
                                                            Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(baseLoanedAmount)
                                                        }}</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.supplyBase; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Supply</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.withdrawBase; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Withdraw</button>
                                                    </td>
                                                </tr>
                                                <tr class="tw-border-b tw-border-gray-600">
                                                    <td>{{ pool.quoteName }}</td>
                                                    <td>
                                                        <span
                                                            class="tw-text-sm tw-text-gray-300 tw-leading-tighter">Deposited</span><br />
                                                    </td>
                                                    <td>
                                                        <span class="tw-text-medium">{{
                                                            Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(quoteLoanedAmount)
                                                        }}</span>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.supplyQuote; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Supply</button>
                                                    </td>
                                                    <td class="end">
                                                        <button
                                                            @click="() => { event = Events.withdrawQuote; showModal() }"
                                                            class="tw-text-sm tw-px-3 tw-py-1 tw-bg-blue-600 tw-rounded-lg">Withdraw</button>
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
