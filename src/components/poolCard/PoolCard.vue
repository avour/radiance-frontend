<script setup lang="ts">
defineProps<{
  token1Image: string,
  token2Image: string,
  pairName: string,
  apr: number,
  supply: string
}>()

</script>


<template>
  <div class="pool_card flex_column">
    <h3 class="pool_name">{{pairName}}</h3>

    <div class="pool_image flex_row_center">
      <img :src="token1Image" :alt="pairName" />
      <img :src="token2Image" :alt="pairName" />
    </div>

    <div class="more_info desktop_only flex_row">
      <div class="more_info_details">
        <span>Supply:</span> ${{supply}}
      </div>

      <div class="more_info_details">
        <span>S. APR:</span> {{apr}}%
      </div>

      <div class="more_info_details">
        <span>Borrowed:</span> ${{supply}}
      </div>

      <div class="more_info_details">
        <span>B. APR:</span> {{apr}}%
      </div>
    </div>

    <div class="more_info mobile_only flex_row">
      <div class="more_info_details">
        <span>Supply APR:</span> {{apr}}%
      </div>

      <div class="more_info_details">
        <span>Borrow APR:</span> {{apr}}%
      </div>
    </div>
  </div>
</template>


<style scoped>

.pool_card:hover {
  cursor: pointer;
  transition: all ease-in 0.2s;
  transform: scale(1.03);
}

.pool_name {
  font-size: 1rem;
}

.pool_card.flex_column {
  width: calc(25% - 2.8rem);
  padding: .2rem 1rem 1.5rem;
  border-radius: var(--radius);
  background: var(--primaryColor);
}

.pool_image {
  padding-left: 1.7rem;
}

.pool_image img {
  padding: .2rem;
  background: var(--hoverColor);
}

.pool_image img:first-of-type {
  position: relative;
  /*z-index: 2;*/
}

.pool_image img:last-of-type {
  position: relative;
  left: -2.5rem;
}

.pool_image img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

@media only screen and (max-width: 600px) {
  .pool_card.flex_column {
    width: 43%;
    padding-bottom: .5rem;
  }

  .pool_image {
    padding-left: .5rem;
  }

  .pool_image img {
    width: 55px;
    height: 55px;
  }

  .pool_image img:last-of-type {
    left: -1rem;
  }

  .more_info {
    /*display: none;*/
  }
}

.more_info {
  gap: .4rem .3rem;
  margin-top: 1.8rem;
  color: var(--hoverColor);
}

.more_info_details {
  font-size: .8rem;
  padding: .1rem .6rem;
  background: #4b2630;
  border-radius: .4rem;
}
</style>
