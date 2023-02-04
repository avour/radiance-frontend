
import idl from "./raydiance.json";
import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-vue";

import { Connection } from "@solana/web3.js";

const LP_MINT = new anchor.web3.PublicKey("ELinmEgCTWXhHChfdp4pdgEraypESJbAiXd4aYNx1Lry");
const BORROWABLE_BASE_MINT = new anchor.web3.PublicKey("H6ouuizxz99CAkcB17C8pygAmSrg7YYGQXA2BKCYeums");
const BORROWABLE_QUOTE_MINT = new anchor.web3.PublicKey("GME4vqpz5zsdocRN5nici8zns5SfGrVJJxJsBwNWbWtR");

export const preflightCommitment = "processed";


const connection = new Connection("");
const provider = new anchor.AnchorProvider (connection, wallet, anchor.AnchorProvider.defaultOptions());
const program = new anchor.Program(idl, programID, provider);


const getPdaParams = async (connection: anchor.web3.Connection, user: anchor.web3.PublicKey, serum_market: anchor.web3.PublicKey, lp_mint: anchor.web3.PublicKey): Promise<PDAParameters> => {
    const uid = new anchor.BN(parseInt((Date.now() / 1000).toString()));
    const uidBuffer = uid.toBuffer('le', 8);

    let [lendingPoolPubKey,] = await anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("lending_pool"), serum_market.toBuffer(), uidBuffer], program.programId,
    );


    let [collateralVault,] = await anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("collateral_vault"), serum_market.toBuffer(), uidBuffer], program.programId,
    );

    let [userCollateralConfigKey,] = await anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("user_collateral_config"), provider.wallet.publicKey.toBuffer(), serum_market.toBuffer(), uidBuffer], program.programId,
    );

    let [borrowableBaseVault,] = await anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("borrowable_vault"), serum_market.toBuffer(), BORROWABLE_BASE_MINT.toBuffer(), uidBuffer], program.programId,
    );

    let [borrowableQuoteVault,] = await anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("borrowable_vault"), serum_market.toBuffer(), BORROWABLE_BASE_MINT.toBuffer(), uidBuffer], program.programId,
    );


    return {
        poolID: uid,
        collateralVault: collateralVault,
        lendingPoolKey: lendingPoolPubKey,
        userCollateralConfigKey: userCollateralConfigKey,
        borrowableBaseVault, borrowableQuoteVault,
    }
}
