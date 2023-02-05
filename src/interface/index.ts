import { Program, Provider } from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { AnchorWallet } from 'solana-wallets-vue';
import { Raydiance } from '../idl/raydiance';
import { ComputedRef, Ref } from 'vue';

export interface IWorkspace {
  wallet: Ref<AnchorWallet | undefined>;
  provider: ComputedRef<Provider>;
  program: ComputedRef<Program<Raydiance>>;
  connection: Connection;
}
