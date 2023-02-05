import { computed } from 'vue';
import { useAnchorWallet } from 'solana-wallets-vue';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Idl, Program, AnchorProvider, Wallet } from '@project-serum/anchor';
import { Raydiance } from '../idl/raydiance';
import { IWorkspace } from '../interface';
import idl from "../idl/raydiance.json";

const preflightCommitment = 'processed';
const commitment = 'processed';
const programId = new PublicKey((idl as Idl).metadata.address);
let workspace: IWorkspace;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(
    clusterApiUrl("devnet"),
    commitment
  );
  const provider = computed(
    () =>
      new AnchorProvider(connection, wallet.value as Wallet, {
        preflightCommitment,
        commitment,
      })
  );
  const program = computed(
    // @ts-ignore
    () => new Program<Raydiance>(idl, programId, provider.value)
  );

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
