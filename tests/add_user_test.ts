import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PresaleContract } from "../target/types/presale_contract";
import { PublicKey } from '@solana/web3.js';
import { assert, expect } from "chai";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { BN } from "bn.js";
import { getLogs } from "@solana-developers/helpers";

const config = {
    user1: anchor.web3.Keypair.generate(),
    amount1: new BN(1),
    amount2: new BN(2),
};


describe("Add users test", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace
        .PresaleContract as Program<PresaleContract>;

    const owner = anchor.Wallet.local().payer;



    it("should create new user balance", async () => {
        const [userAccount, bump] = PublicKey.findProgramAddressSync([Buffer.from("presale_account"), config.user1.publicKey.toBuffer()], program.programId);


        // Call the addUser method
        const tx1 =
            await program.methods.addUser(config.amount1).accounts({
                userAccount: userAccount,
                userWallet: config.user1.publicKey,
                owner: owner.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            }).rpc();



        const wallet_info1 = await program.methods.getWalletInfo().accounts({
            userAccount: userAccount,
            userWallet: config.user1.publicKey,
        }).view();


        assert(wallet_info1.allocatedAmount.eq(config.amount1));
        assert(wallet_info1.bump == bump);


        const tx2 =
            await program.methods.addUser(config.amount1).accounts({
                userAccount: userAccount,
                userWallet: config.user1.publicKey,
                owner: owner.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            }).rpc();

        const wallet_info2 = await program.methods.getWalletInfo().accounts({
            userAccount: userAccount,
            userWallet: config.user1.publicKey,
        }).view();

        assert(wallet_info2.allocatedAmount.eq(config.amount1.add(config.amount1)));
        assert(wallet_info2.bump == bump);


    });


});
