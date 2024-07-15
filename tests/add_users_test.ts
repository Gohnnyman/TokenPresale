// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { PresaleContract } from "../target/types/presale_contract";
// import {
//     airdrop,
//     getAtaForMint,
//     getPresaleContractPda,
//     mintToken,
// } from "./utils";
// import { PublicKey } from '@solana/web3.js';
// import { assert } from "chai";
// import {
//     ASSOCIATED_TOKEN_PROGRAM_ID,
//     TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";
// import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
// import { BN } from "bn.js";
// import { getLogs } from "@solana-developers/helpers";

// const config = {
//     tokens: 3,
//     allocations: 2,
//     ppt: 0.01 * anchor.web3.LAMPORTS_PER_SOL,
//     ppa: 0.1 * anchor.web3.LAMPORTS_PER_SOL,
//     presale_start: Date.now(),
//     presale_end: Date.now() + 10000000000000,
//     pubsale_start: Date.now(),
//     pubsale_end: Date.now() + 10000000000000,
// };


// describe("Add users test", () => {
//     // Configure the client to use the local cluster.
//     anchor.setProvider(anchor.AnchorProvider.env());
//     const program = anchor.workspace
//         .PresaleContract as Program<PresaleContract>;

//     const owner = anchor.Wallet.local().payer;

//     const buyer1 = anchor.web3.Keypair.generate();
//     const buyer2 = anchor.web3.Keypair.generate();
//     const buyer3 = anchor.web3.Keypair.generate();
//     const buyer4 = anchor.web3.Keypair.generate();
//     const buyer5 = anchor.web3.Keypair.generate();
//     const buyer6 = anchor.web3.Keypair.generate();
//     const buyer7 = anchor.web3.Keypair.generate();
//     const buyer8 = anchor.web3.Keypair.generate();
//     const buyer9 = anchor.web3.Keypair.generate();
//     const buyer10 = anchor.web3.Keypair.generate();
//     const buyer11 = anchor.web3.Keypair.generate();
//     const buyer12 = anchor.web3.Keypair.generate();
//     const buyer13 = anchor.web3.Keypair.generate();
//     const buyer14 = anchor.web3.Keypair.generate();
//     const buyer15 = anchor.web3.Keypair.generate();
//     const buyer16 = anchor.web3.Keypair.generate();
//     const buyer17 = anchor.web3.Keypair.generate();
//     const buyer18 = anchor.web3.Keypair.generate();
//     const buyer19 = anchor.web3.Keypair.generate();
//     const buyer20 = anchor.web3.Keypair.generate();


//     it("should add new user's balance", async () => {


//         // Generate a presale account
//         const presaleAccount = anchor.web3.Keypair.generate();

//         // Initialize the presale account (if necessary in your program)
//         // Replace with your actual account initialization logic
//         // For example, if initialization is not needed, skip this step

//         // Assuming presale account is initialized, proceed to add users

//         // interface UserAllocation {
//         //     wallet: PublicKey; // Assuming wallet is a string representation of PublicKey
//         //     allocated_amount: BN; // Assuming allocateAmount is a number
//         // }

//         // const users: UserAllocation[] = [
//         //     {
//         //         wallet: owner.publicKey,
//         //         allocated_amount: new BN(1),
//         //     }
//         // ];


//         const [presale_account_pubkey, bump] = PublicKey.findProgramAddressSync([Buffer.from("presale_account")], program.programId);



//         console.log("presale_account_pubkey", presale_account_pubkey.toString());
//         console.log("bump", bump);

//         const [remaining_account_0, bump_0] = PublicKey.findProgramAddressSync([Buffer.from("account"), owner.publicKey.toBuffer()], program.programId);
//         const [remaining_account_1, bump_1] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer1.publicKey.toBuffer()], program.programId);
//         const [remaining_account_2, bump_2] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer2.publicKey.toBuffer()], program.programId);
//         const [remaining_account_3, bump_3] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer3.publicKey.toBuffer()], program.programId);
//         const [remaining_account_4, bump_4] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer4.publicKey.toBuffer()], program.programId);
//         const [remaining_account_5, bump_5] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer5.publicKey.toBuffer()], program.programId);
//         const [remaining_account_6, bump_6] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer6.publicKey.toBuffer()], program.programId);
//         const [remaining_account_7, bump_7] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer7.publicKey.toBuffer()], program.programId);
//         const [remaining_account_8, bump_8] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer8.publicKey.toBuffer()], program.programId);
//         const [remaining_account_9, bump_9] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer9.publicKey.toBuffer()], program.programId);
//         const [remaining_account_10, bump_10] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer10.publicKey.toBuffer()], program.programId);
//         const [remaining_account_11, bump_11] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer11.publicKey.toBuffer()], program.programId);
//         const [remaining_account_12, bump_12] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer12.publicKey.toBuffer()], program.programId);
//         const [remaining_account_13, bump_13] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer13.publicKey.toBuffer()], program.programId);
//         const [remaining_account_14, bump_14] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer14.publicKey.toBuffer()], program.programId);
//         const [remaining_account_15, bump_15] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer15.publicKey.toBuffer()], program.programId);
//         const [remaining_account_16, bump_16] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer16.publicKey.toBuffer()], program.programId);
//         const [remaining_account_17, bump_17] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer17.publicKey.toBuffer()], program.programId);
//         const [remaining_account_18, bump_18] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer18.publicKey.toBuffer()], program.programId);
//         const [remaining_account_19, bump_19] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer19.publicKey.toBuffer()], program.programId);
//         const [remaining_account_20, bump_20] = PublicKey.findProgramAddressSync([Buffer.from("account"), buyer20.publicKey.toBuffer()], program.programId);









//         // Call the AddUsers method
//         const amount = new BN(1);
//         const tx =
//             await program.methods.addUsers([{
//                 pubkey: owner.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer1.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer2.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer3.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer4.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer5.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer6.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer7.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer8.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer9.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer10.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer11.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer12.publicKey,
//                 allocateAmount: amount
//             }, {
//                 pubkey: buyer13.publicKey,
//                 allocateAmount: amount
//             }]).accounts({
//                 //    presaleAccount: presale_account_pubkey,
//                 owner: owner.publicKey,
//                 systemProgram: anchor.web3.SystemProgram.programId
//             }).remainingAccounts([{
//                 pubkey: remaining_account_0,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_1,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_2,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_3,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_4,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_5,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_6,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_7,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_8,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_9,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_10,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_11,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_12,
//                 isWritable: true,
//                 isSigner: false
//             }, {
//                 pubkey: remaining_account_13,
//                 isWritable: true,
//                 isSigner: false
//             }]).rpc();


//         // //build transaction
//         // const transaction = new anchor.web3.Transaction();
//         // transaction.add(instruction);
//         // //broadcast transaction to the network
//         // const tx = await program.provider.sendAndConfirm(transaction, [owner]);
//         // //log outputs

//         const logs = await getLogs(anchor.getProvider().connection, tx);



//         console.log(logs);


//         // Fetch the presale account data after adding users
//         // const presaleAccountData = await program.account.presaleAccount.fetch(presaleAccount.publicKey);

//         // // Assertions
//         // assert.equal(presaleAccountData.users.length, 2);
//         // assert.equal(presaleAccountData.users[0].wallet, buyer1.publicKey.toString());
//         // assert.equal(presaleAccountData.users[0].allocateAmount, 500);
//         // assert.equal(presaleAccountData.users[1].wallet, buyer2.publicKey.toString());
//         // assert.equal(presaleAccountData.users[1].allocateAmount, 300);
//         // Add more assertions based on your program's logic




//     });


// });
