<script setup lang="ts">
import { useRouter } from 'vue-router';
import PoolCard from "./PoolCard.vue";
import { useWorkspace } from '../../hooks/useWorkspace';
import {getPdaParams} from '../../web3_utils'
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

// const { program } = useWorkspace();
// await program.value.rpc.myInstruction(/* ... */);
export interface Pool {
  poolId: number,
  serumMakert: PublicKey
  lpMint: PublicKey
  borrowableBaseMint: PublicKey,
  borrowableQuoteMint: PublicKey,
  baseName: string,
  quoteName: string,

  apr: number
  supply: string
  name: string
  image1: string
  image2: string

}

const router = useRouter()

defineProps<{ sectionTitle: string, poolData: Pool[] }>()


const onTapPool = async (pool: Pool) => {
  // const workspace = useWorkspace();
  // const { program, wallet, provider } = workspace;
  // const poolId = parseInt((Date.now() / 1000).toString());
  // const pda = await getPdaParams(workspace, pool.poolId, pool.serumMakert);

  // let baseRadianceMint = anchor.web3.Keypair.generate();
  // let quoteRadianceMint = anchor.web3.Keypair.generate();


  // await program.value.methods.createPool({
  //     poolId: pda.poolID,
  //     safetyMargin: new anchor.BN("250"),
  //     liquidationIncentive: new anchor.BN("104"),
  //   }).accounts({
  //     lendingPool: pda.lendingPoolKey,
  //     collateralVault: pda.collateralVault,
  //     lpMint: pool.lpMint,
  //     borrowableBaseVault: pda.borrowableBaseVault,
  //     borrowableQuoteVault: pda.borrowableQuoteVault,

  //     baseRadianceMint: baseRadianceMint.publicKey,
  //     quoteRadianceMint: quoteRadianceMint.publicKey,

  //     borrowableBaseMint: pool.borrowableBaseMint,
  //     borrowableQuoteMint: pool.borrowableQuoteMint,

  //     user: wallet.value!.publicKey,
  //     serumMarket: pool.serumMakert,
  //     // dexProgram: dexProgram,

  //     systemProgram: anchor.web3.SystemProgram.programId,
  //     tokenProgram: TOKEN_PROGRAM_ID,
  //     rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  //   })
  //     .signers([baseRadianceMint, quoteRadianceMint])
  //     .rpc();

  router.push({
      name: 'pool-details',
      params: { id: pool.poolId, title: pool.name.replaceAll(/[^a-zA-Z0-9 ]/g,'').toLowerCase() },
    });
  }
</script>


<template>
  <div>
    <div class="section_title">
      <h2>{{sectionTitle}}</h2>
    </div>

    <section class="pool_card_container">
      <PoolCard
          v-for="pool, i in poolData"
          :key="i"
          :apr="pool.apr"
          :supply="pool.supply"
          :pairName="pool.name"
          :token1Image="pool.image1"
          :token2Image="pool.image2"
          @click="onTapPool(pool)"
      />
    </section>
  </div>
</template>


<style scoped>
  .section_title {
    color: white;
    font-size: 1.3rem;
     margin-top: 2.5rem;
  }

  .pool_card_container {
    gap: var(--gap1);
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    justify-content: space-between;
  }
</style>
