<script setup lang="ts">
  // import DataTable from 'datatables.net-vue3';
</script>


<template>
<!--  <div class="tw-w-full">-->
<!--    <DataTable-->
<!--      :options="{ search: true }"-->
<!--      class="display tw-table-auto tw-border-collapse tw-w-full"-->
<!--    >-->
<!--      <thead class="tw-border-b-2 tw-text-gray-100" align="left">-->
<!--        <th>Pool Name</th>-->
<!--        <th>Liquidity</th>-->
<!--        <th>Volume</th>-->
<!--        <th>Fees</th>-->
<!--        <th>APR</th>-->
<!--        <th></th>-->
<!--      </thead>-->

<!--      <tbody class="tw-text-gray-200">-->
<!--        <slot></slot>-->
<!--      </tbody>-->
<!--    </DataTable>-->
<!--  </div>-->

  <div class="table_container">
    <div class="table">

      <div class="space_between">
        <div class="flex_column title">
          <h2>Lending Pools</h2>
          <p>Earn yield on trading fees by providing liquidity</p>
        </div>

        <div class="input_container">
          <i class="fal fa-search"></i>
          <input class="input" placeholder="Search pools" />
        </div>
      </div>

      <div class="table_headers space_between">
        <div class="pool_name flex_row_center">
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
          <i class="fad fa-sort-up"></i>
        </div>
      </div>

      <div class="cards flex_column">
        <slot />
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
  h2, h5, p {
    padding: 0;
    margin: 0;
  }

  .table {
    .title {
      gap: .1rem;
      h2 {
        color: white;
        font-size: 1.3rem;
      }
      p {
        font-size: .9rem;
        color: var(--darkText);
      }
    }
  }

  .table_headers {
    margin: 2rem 0 1rem;
    border-radius: var(--smRadius);
    background: rgba(0, 0, 0, 0.12);
    // width: calc(100% - 4rem);
    padding: 1rem 2rem;
    color: white;

    h5 {
      font-size: .9rem;
    }

    > div:first-of-type {
      justify-content: flex-start;
      width: 32% !important;
    }

    > div {
      display: flex;
      //justify-content: center;
      // width: calc(17% - .5rem);
    }

    div {
      gap: .5rem;
      align-items: center;
      display: flex;
    }
  }

  @media only screen and (max-width: 600px) {
    .input_container {
      width: 100%;
      margin-top: 1rem;
      input {
        width: calc(100% - 2.8rem);
      }
    }

    .table_headers {
      padding: 1rem;
      width: calc(100% - 2rem);
      justify-content: space-between;
      > div {
        display: none;
      }

      .pool_name, .supply {
        width: 45%;
        display: flex;
      }

      .supply {
        justify-content: flex-end;
      }
    }
  }

</style>
