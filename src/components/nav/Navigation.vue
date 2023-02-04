<script setup lang="ts">
</script>


<template>
  <nav class="navigation">
    <div class="space_between">
      <h1><RouterLink to="/">RADIANCE</RouterLink></h1>
      <div class="row_flex_end">
        <button class="button">
          <i class="fal fa-wallet"></i>
          <span>
            Connect
            <span class="wallet">wallet</span>
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>


<style scoped>
  nav.navigation {
    padding: .4rem var(--gutter);
    background: var(--primaryColor);
    width: 100%;
  }

  .space_between div {
    width: 20%;
  }

  .button {
    width: fit-content;
  }

  @media only screen and (max-width: 600px) {
    .space_between div {
      width: 50%;
    }

    .button {
      padding: .6rem .7rem;
      border-radius: .3rem;
    }

    .button span {
      bottom: -.125rem;
      position: relative;
    }

    .button span.wallet {
      display: none;
    }
  }

</style>
