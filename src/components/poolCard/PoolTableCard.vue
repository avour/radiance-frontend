<script setup lang="ts">
import Sol from "../../assets/Solana_logo.png"
import USDC from "../../assets/usd-coin.png"
</script>


<template>
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

  .table_pool_card {
    padding: 1.5rem 1rem;
    border-radius: var(--radius);
    width: calc(100% - 2rem);
    background: rgba(0, 0, 0, 0.34);
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
