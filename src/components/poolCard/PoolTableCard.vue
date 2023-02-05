<script setup lang="ts">
import Sol from "../../assets/Solana_logo.png"
import USDC from "../../assets/usd-coin.png"
</script>


<template>
<!--  <tr class="hover:tw-bg-gray-200/20 tw-text-sm tw-rounded-full">-->
<!--    <td class="tw-py-3">-->
<!--      <span class="tw-flex tw-gap-2 tw-items-center">-->
<!--        <span class="flex_row_center">-->
<!--          <span class="cardBackground tw-w-8 tw-h-8 tw-p-1 tw-rounded-full"><img :src="Sol"></span>-->
<!--          <span class="cardBackground tw-w-8 tw-h-8 tw-p-1 tw-rounded-full"><img :src="USDC"></span>-->
<!--        </span>-->
<!--        <span>SOL/USDT</span>-->
<!--      </span>-->
<!--    </td>-->
<!--    <td class="tw-py-3">$4,724,544</td>-->
<!--    <td class="tw-py-3">$124,544</td>-->
<!--    <td class="tw-py-3">8.7%</td>-->
<!--    <td class="tw-py-3">11.92%</td>-->
<!--    <td><button><span><i class="fal fa-ellipsis"></i></span></button></td>-->
<!--  </tr>-->


  <div class="table_pool_card">
    <div class="table_headers flex_row">
      <div class="pool_name flex_row">
        <div class="flex_row_center">
          <img :src="Sol" width="34" alt="token" />
          <img :src="USDC" width="34" alt="token" />
        </div>
        <h4>SOL/USD</h4>
      </div>
      <div class="supply">
        <h5>$4,724,544</h5>
      </div>
      <div>
        <h5>$143,104</h5>
      </div>
      <div>
        <h5>8.74%</h5>
      </div>
      <div>
        <h5>11.92%</h5>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
  h2, h4, h5, p {
    padding: 0;
    margin: 0;
  }

  td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
   }
  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
   }

  tr:first-child td { border-top-style: solid; }
  tr td:first-child { border-left-style: solid; }

  .table_pool_card {
    padding: 1.5rem 1rem;
    border-radius: var(--radius);
    // width: calc(100% - 2rem);
    background: rgba(0, 0, 0, 0.21);
  }

  .table_headers {
    border-radius: var(--smRadius);
    width: calc(100% - 2rem);
    padding: 0 1rem;
    color: var(--darkText);

    h5 {
      font-size: .9rem;
    }

    > div:first-of-type {
      width: 32% !important;
    }

    > div {
      display: flex;
      width: calc(17% - .5rem);
    }

    div {
      gap: .5rem;
      align-items: center;
      display: flex;
    }
  }

  .pool_name {
    h4 {
      top: .1rem;
      left: -.8rem;
      position: relative;
    }

    .flex_row_center {
      //width: 100%;
      img {
        padding: .1rem;
        display: inline-block;
        border-radius: 50%;
        background: var(--hoverColor);
      }

      img:first-of-type {
        position: relative;
        /*z-index: 2;*/
      }

      img:last-of-type {
        position: relative;
        left: -1.2rem;
      }

    }
  }


  @media only screen and (max-width: 600px) {
    .table_headers {
      padding: 0;
      width: 100%;
      justify-content: space-between;
      > div {
        display: none;
      }

      > div:first-of-type {
        width: 60% !important;
        h4 {
          left: -1rem;
        }
      }

      .pool_name, .supply {
        width: 35% !important;
        display: flex;
      }

      .supply {
        justify-content: flex-end;
      }
    }
  }
</style>
