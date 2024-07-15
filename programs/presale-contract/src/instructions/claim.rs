use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

use crate::state::UserAccount;

use crate::{PresaleContractError, PRESALE_ACCOUNT_SEED};

#[derive(Accounts)]
pub struct Claim<'info> {
    /// The program account
    /// CHECK: The program account, used for the creation of the associated token account
    pub program_account: AccountInfo<'info>,

    /// The user's wallet account
    /// CHECK: This is the user's wallet account (wallet address), used only for the validation of the user account
    pub user_wallet: AccountInfo<'info>,

    /// The user account to claim tokens from
    #[account(
        mut,
        seeds = [
            PRESALE_ACCOUNT_SEED.as_bytes(), 
            user_wallet.key.as_ref()
        ],
        bump = user_account.bump,
    )]
    pub user_account: Account<'info, UserAccount>,

    /// The program's token account
    #[account(mut)]
    pub program_token_account: Account<'info, TokenAccount>,

    /// The user's token account
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,


    /// The owner of the smart contract
    #[account(
        address = crate::admin::id() @ PresaleContractError::Unauthorized
    )]
    pub owner: Signer<'info>,

    /// The token program
    pub token_program: Program<'info, Token>,

    /// The system program for the creation of the user account
    pub system_program: Program<'info, System>,
}
