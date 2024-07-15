import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PresaleContract } from "../target/types/presale_contract";
import { PublicKey } from '@solana/web3.js';
import { assert, expect } from "chai";
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
    user1: anchor.web3.Keypair.generate(),
    amountOfTokensToFund: new BN(5),
    tokensToMint: 100,
};


describe("Fund test", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace
        .PresaleContract as Program<PresaleContract>;

    const owner = anchor.Wallet.local().payer;


    const tokenAuthority = new anchor.web3.Keypair();
    const buyer = new anchor.web3.Keypair();

    let tokenMint: anchor.web3.PublicKey = null;
    let authorityAta: anchor.web3.PublicKey = null;
    let programAta: anchor.web3.PublicKey = null;

    before("initialize mint", async () => {
        //fund wallets 
        await airdrop(tokenAuthority.publicKey, program.provider.connection);
        await airdrop(buyer.publicKey, program.provider.connection);



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

    });


    it("should be able to fund program", async () => {
        const tx = await program.methods.fund(config.amountOfTokensToFund).accounts({
            callerTokenAccount: authorityAta,
            programTokenAccount: programAta,
            mint: tokenMint,
            caller: tokenAuthority.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId
        }).signers([tokenAuthority]).rpc();


        let programAtaData = await getAccount(program.provider.connection, programAta);

        assert(Number(programAtaData.amount) == config.amountOfTokensToFund.toNumber());
        assert(programAtaData.owner.equals(program.programId));
        assert(programAtaData.mint.equals(tokenMint));

        const logs = await getLogs(anchor.getProvider().connection, tx);

    });


});
