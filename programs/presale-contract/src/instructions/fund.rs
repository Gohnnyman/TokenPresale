use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct Fund<'info> {
    /// The caller's token account from which tokens will be transferred
    #[account(mut)]
    pub caller_token_account: Account<'info, TokenAccount>,

    /// The program's token account where tokens will be deposited
    #[account(mut)]
    pub program_token_account: Account<'info, TokenAccount>,

    /// The mint of the token to be transferred
    pub mint: Account<'info, Mint>,

    /// The caller who is funding the program
    pub caller: Signer<'info>,

    /// The token program
    pub token_program: Program<'info, Token>,

    /// The system program
    pub system_program: Program<'info, System>,
}
