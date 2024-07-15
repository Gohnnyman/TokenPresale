use anchor_lang::prelude::*;

use crate::{state::UserAccount, PRESALE_ACCOUNT_SEED};

#[derive(Accounts)]
pub struct GetUserInfo<'info> {
    /// The user account to get the information from
    #[account(
        seeds = [
            PRESALE_ACCOUNT_SEED.as_bytes(), 
            user_wallet.key.as_ref()
        ],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,

    /// The user's wallet account
    /// CHECK: This is the user's wallet account (wallet address), used only for the validation of the user account
    pub user_wallet: AccountInfo<'info>,
}
