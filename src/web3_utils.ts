
import * as anchor from "@project-serum/anchor";
import { PublicKey, clusterApiUrl } from '@solana/web3.js';
import { IWorkspace } from "./interface";

import {
    createAccount,
    createAssociatedTokenAccount,
    createAssociatedTokenAccountInstruction,
    createInitializeAccountInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    getAccount,
    getAssociatedTokenAddress,
    getMint,
    TOKEN_PROGRAM_ID,

} from "@solana/spl-token";



const LP_MINT = new PublicKey("ELinmEgCTWXhHChfdp4pdgEraypESJbAiXd4aYNx1Lry");
const BORROWABLE_BASE_MINT = new PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums");
const BORROWABLE_QUOTE_MINT = new PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR");

interface PDAParameters {
    poolID: anchor.BN,
    collateralVault: PublicKey,
    lendingPoolKey: PublicKey,
    userCollateralConfigKey: PublicKey,
    borrowableBaseVault: PublicKey,
    borrowableQuoteVault: PublicKey,
}


export const getPdaParams = async (workspace: IWorkspace, poolId: number, serum_market: PublicKey): Promise<PDAParameters> => {
    const { program, wallet } = workspace;

    const uid = new anchor.BN(poolId.toString());
    // uid.toBu
    const uidBuffer = uid.toArrayLike(Buffer, 'le', 8);
    // const uidBuffer = uid.toBuffer('le', 8);

    let [lendingPoolPubKey,] = await PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("lending_pool"), serum_market.toBuffer(), uidBuffer], program.value.programId,
    );


    let [collateralVault,] = await PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("collateral_vault"), serum_market.toBuffer(), uidBuffer], program.value.programId,
    );

    let [userCollateralConfigKey,] = await PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("user_collateral_config"), wallet.value!.publicKey.toBuffer(), serum_market.toBuffer(), uidBuffer], program.value.programId,
    );

    let [borrowableBaseVault,] = await PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("borrowable_vault"), serum_market.toBuffer(), BORROWABLE_BASE_MINT.toBuffer(), uidBuffer], program.value.programId,
    );

    let [borrowableQuoteVault,] = await PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("borrowable_vault"), serum_market.toBuffer(), BORROWABLE_BASE_MINT.toBuffer(), uidBuffer], program.value.programId,
    );


    return {
        poolID: uid,
        collateralVault: collateralVault,
        lendingPoolKey: lendingPoolPubKey,
        userCollateralConfigKey: userCollateralConfigKey,
        borrowableBaseVault, borrowableQuoteVault,
    }
}

export const createUserAssociatedTokenAccount = async (workspace: IWorkspace, mint: anchor.web3.Keypair): Promise<anchor.web3.PublicKey> => {
    const { provider, wallet } = workspace;

    let userAssociatedTokenAccount: anchor.web3.PublicKey;

    userAssociatedTokenAccount = await getAssociatedTokenAddress(
        mint.publicKey,
        wallet.value!.publicKey
    )

    try {
        // Create a token account for the user
        const tx1 = new anchor.web3.Transaction();
        tx1.add(createAssociatedTokenAccountInstruction(
            wallet.value!.publicKey,
            userAssociatedTokenAccount,
            wallet.value!.publicKey,
            mint.publicKey,
        ))
        await provider.value!.sendAndConfirm!(tx1);

    } catch (error) {
        console.log("User Token Associated Account probably already exists ", error);
    }
    return userAssociatedTokenAccount;

}