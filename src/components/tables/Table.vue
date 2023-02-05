<script setup lang="ts">
  import type { Header, Item } from "vue3-easy-data-table";
  // import PoolTableCard from '../poolCard/PoolTableCard.vue';
  import { Pool } from '../poolCard/PoolCardContainer.vue';
  defineProps<{ pools: Pool[] }>()

  const headers: Header[] = [
    { text: "Pool Name", value: "name" },
    { text: "Liquidity", value: "supply", sortable: true },
    { text: "Volume", value: "supply", sortable: true },
    { text: "Fees", value: "apr", sortable: true },
    { text: "APR", value: "apr", sortable: true }
  ];

</script>


<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-5">
      <div>
        <h3 class="tw-text-2xl tw-text-white tw-font-bold">Liquidity Pools</h3>
        <p class="tw-text-sm tw-text-gray-200">Earn yield on trading fiels by providing liquidity</p>
      </div>

      <div class="tw-flex tw-items-center">
        <input placeholder="Search All" class="tw-p-2 tw-rounded-lg placeholder:tw-text-sm" />
      </div>
    </div>
    <EasyDataTable
      :headers="headers"
      :items="pools"
      table-class-name="customize-table"
      buttons-pagination
      hide-rows-per-page
      alternating
      class="display tw-table-auto tw-border-collapse tw-w-full"
    >
      <template #expand="item">
        <div class="tw-px-[70px] tw-py-3 tw-flex tw-gap-5 tw-justify-between">
          <div class="tw-flex tw-flex-col">
            <h4 class="tw-text-sm tw-font-medium tw-mb-1">Your Liquidity</h4>
            <p class="tw-text-sm tw-font-semiBold">$0</p>
            <p class="tw-text-sm tw-font-semiBold">LP $0</p>
          </div>
          <div class="tw-flex tw-flex-col">
            <h4 class="tw-text-sm tw-font-medium tw-mb-1">Assets Pooled</h4>
            <p class="tw-text-sm tw-font-semiBold">0 SOL</p>
            <p class="tw-text-sm tw-font-semiBold">0 USDC</p>
          </div>
          <div class="tw-flex tw-flex-col tw-justify-start">
            <h4 class="tw-text-sm tw-font-medium tw-mb-1">Your share</h4>
            <p class="tw-text-sm tw-font-semiBold">0%</p>
          </div>
          <div class="tw-flex tw-gap-2 tw-items-center">
            <button class="tw-px-4 tw-py-2 tw-bg-violet-500 tw-rounded-lg">
              <span>Add Liquidity</span>
            </button>
            <button class="tw-px-4 tw-py-2 tw-bg-violet-500 tw-rounded-lg">
              <span>Remove Liquidity</span>
            </button>
            <button class="tw-px-4 tw-py-2 tw-bg-violet-500 tw-rounded-lg">
              <span>Swap</span>
            </button>
          </div>
        </div>
      </template>
    </EasyDataTable>
  </div>
  <!-- <div class="table_container">
    <div class="table tw-w-full tw-p-12">

      <div class="tw-flex tw-justify-between">
        <div class="flex_column title">
          <h2>Lending Pools</h2>
          <p>Earn yield on trading fees by providing liquidity</p>
        </div>

        <div class="input_container">
          <i class="fal fa-search"></i>
          <input class="input" placeholder="Search pools" />
        </div>
      </div>

      <div class="table_headers tw-flex tw-justify-between tw-mb-2">
        <div class="pool_name">
          <h5>Pool Name</h5>
        </div>
        <div class="supply">
          <h5>Total Supply</h5>
          <i class="fad fa-sort-up"></i>
        </div>
        <div>
          <h5>Total Borrowed</h5>
          <i class="fad fa-sort-up"></i>
        </div>
        <div>
          <h5>Supply APR</h5>
          <i class="fad fa-sort-up"></i>
        </div>
        <div>
          <h5>Borrow APR</h5>
          <i class="fad fa-sort-up#/pool/pools"></i>
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-gap-y-2">
        <slot />
      </div>
    </div>
  </div> -->
</template>


// <style scoped lang="scss">
//   h2, h5, p {
//     padding: 0;
//     margin: 0;
//   }

//   .table {
//     .title {
//       gap: .1rem;
//       h2 {
//         font-size: 1.3rem;
//       }
//       p {
//         font-size: .9rem;
//         color: var(--darkText);
//       }
//     }
//   }

//   .table_headers {
//     margin-top: 2rem;
//     border-radius: var(--smRadius);
//     background: rgba(0, 0, 0, 0.12);
//     // width: calc(100% - 4rem);
//     padding: 1rem 2rem;
//     color: var(--darkText);

//     h5 {
//       font-size: .9rem;
//     }

//     > div:first-of-type {
//       justify-content: flex-start;
//       width: 32% !important;
//     }

//     > div {
//       display: flex;
//       //justify-content: center;
//       // width: calc(17% - .5rem);
//     }

//     div {
//       gap: .5rem;
//       align-items: center;
//       display: flex;
//     }
//   }

//   @media only screen and (max-width: 600px) {
//     .input_container {
//       width: 100%;
//       margin-top: 1rem;
//       input {
//         width: calc(100% - 2.8rem);
//       }
//     }

//     .table_headers {
//       padding: 1rem;
//       width: calc(100% - 2rem);
//       justify-content: space-between;
//       > div {
//         display: none;
//       }

//       .pool_name, .supply {
//         width: 45%;
//         display: flex;
//       }

//       .supply {
//         justify-content: flex-end;
//       }
//     }
//   }

// </style>

<style>
.customize-table {
  --easy-table-border: 0.5px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 64px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-header-item-padding: 20px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #2d3a4f;
  --easy-table-body-row-height: 64px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #eee;
  --easy-table-body-row-hover-background-color: #2d3a4f3b;

  --easy-table-body-item-padding: 20px;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
