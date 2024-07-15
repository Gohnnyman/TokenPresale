use anchor_lang::prelude::*;

use crate::{state::UserAccount, PresaleContractError, PRESALE_ACCOUNT_SEED};




#[derive(Accounts)]
pub struct AddUser<'info> {
    /// User account with all the user's information
    #[account(
        init_if_needed,
        seeds = [
            PRESALE_ACCOUNT_SEED.as_bytes(),
            user_wallet.key.as_ref(),
        ],
        bump,
        payer = owner,
        space = UserAccount::LEN 
    )]
    pub user_account: Account<'info, UserAccount>,

    /// CHECK: This is the user's wallet (his wallet address), used only for the creation of the user account
    pub user_wallet: AccountInfo<'info>,

    /// CHECK: The owner of the smartcontract
    #[account(
        mut, 
        address = crate::admin::id() @ PresaleContractError::Unauthorized
    )]
    pub owner: Signer<'info>,

    /// The system program for the creation of the user account
    pub system_program: Program<'info, System>,
}