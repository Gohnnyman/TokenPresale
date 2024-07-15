use anchor_lang::prelude::*;

use error::*;
use instructions::*;

declare_id!("E3Vym3TLZdcSuyPNAG6ApHchakiKHBYZs5tNzSxtUhUL");

pub mod admin {
    use anchor_lang::prelude::declare_id;
    declare_id!("BeKSTjCnvRmUFpk4FHsw8283VaGP9SV7kD2t8v9MgGkM");
}

pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::system_program;
use anchor_spl::token::{self, Transfer};
use state::UserAccount;

#[program]
mod presale_contract {

    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn add_user<'info>(
        ctx: Context<'_, '_, '_, 'info, AddUser<'info>>,
        allocated_amount: u64,
    ) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.allocated_amount += allocated_amount;
        user_account.bump = ctx.bumps.user_account;

        msg!(
            "User account owner pubkey: {:?}",
            user_account.to_account_info().owner
        );

        Ok(())
    }

    pub fn get_wallet_info(ctx: Context<GetUserInfo>) -> Result<UserAccount> {
        let user_account = &ctx.accounts.user_account;

        Ok(AsRef::<UserAccount>::as_ref(user_account).clone())
    }

    pub fn fund(ctx: Context<Fund>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.caller_token_account.to_account_info(),
            to: ctx.accounts.program_token_account.to_account_info(),
            authority: ctx.accounts.caller.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    // TODO: check mint?
    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        let owner = &ctx.accounts.owner;
        let user_account = &mut ctx.accounts.user_account;

        // Decrease the allocated amount
        let claim_amount = user_account.allocated_amount;

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: user_account.to_account_info(),
                to: owner.to_account_info(),
            },
        );

        system_program::transfer(cpi_context, user_account.to_account_info().lamports())?;

        // Transfer tokens to the user's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.program_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.program_account.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, claim_amount)?;

        Ok(())
    }
}
