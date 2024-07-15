use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct Initialize<'info> {
    /// The program account
    /// CHECK: The program account, used for the creation of the associated token account
    pub program_account: AccountInfo<'info>,

    /// The associated token account to be created
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = program_account
    )]
    pub program_token_account: Account<'info, TokenAccount>,

    /// The mint of the token
    pub mint: Account<'info, Mint>,

    /// The account paying for the initialization
    #[account(mut)]
    pub payer: Signer<'info>,

    /// The system program
    pub system_program: Program<'info, System>,

    /// The token program
    pub token_program: Program<'info, Token>,

    /// The associated token program
    pub associated_token_program: Program<'info, AssociatedToken>,
}
