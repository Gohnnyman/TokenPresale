import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PresaleContract } from "../target/types/presale_contract";
import { PublicKey } from '@solana/web3.js';
import { assert, expect, use } from "chai";
import {
    getAccount,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { BN } from "bn.js";
import { getLogs } from "@solana-developers/helpers";
import { airdrop, getAtaForMint, mintToken } from "./utils";

const config = {
    amountOfTokensToFund: new BN(10),
    amountOfTokensToDelegate: new BN(5),
    tokensToMint: 100,
};


describe("Claim test", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace
        .PresaleContract as Program<PresaleContract>;

    const owner = anchor.Wallet.local().payer;


    const tokenAuthority = new anchor.web3.Keypair();
    const user = new anchor.web3.Keypair();

    let tokenMint: anchor.web3.PublicKey = null;
    let authorityAta: anchor.web3.PublicKey = null;
    let programAta: anchor.web3.PublicKey = null;

    before("initialize mint", async () => {
        //fund wallets 
        await airdrop(tokenAuthority.publicKey, program.provider.connection);
        await airdrop(user.publicKey, program.provider.connection);



        //create new spl token
        const token = await mintToken(
            program.provider,
            tokenAuthority,
            tokenAuthority,
            tokenAuthority,
            config.tokensToMint
        );

        //assign global variables
        tokenMint = token.tokenMint;
        authorityAta = token.payerAta;

        [programAta] = await getAtaForMint(program.programId, tokenMint);

        let tx = await program.methods.initialize().accounts({
            programAccount: program.programId,
            programTokenAccount: programAta,
            mint: tokenMint,
            payer: owner.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        }).signers([owner]).rpc();

        await program.methods.fund(config.amountOfTokensToFund).accounts({
            callerTokenAccount: authorityAta,
            programTokenAccount: programAta,
            mint: tokenMint,
            caller: tokenAuthority.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId
        }).signers([tokenAuthority]).rpc();

    });


    it("should be able to add user and claim program", async () => {

        const [userAccount, _] = PublicKey.findProgramAddressSync([Buffer.from("presale_account"), user.publicKey.toBuffer()], program.programId);

        await program.methods.addUser(config.amountOfTokensToDelegate).accounts({
            userAccount: userAccount,
            userWallet: user.publicKey,
            owner: owner.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        }).rpc();

        // const tx = await program.methods.claim().accounts({
        //     programAccount: program.programId,
        //     userWallet: buyer.publicKey,
        // }).rpc();


        // const logs = await getLogs(anchor.getProvider().connection, tx);

        // console.log(logs);
    });


});
