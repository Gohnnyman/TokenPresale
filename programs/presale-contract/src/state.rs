use anchor_lang::prelude::*;
#[account]
pub struct UserAccount {
    pub bump: u8,
    pub allocated_amount: u64,
}

impl UserAccount {
    pub const LEN: usize = 8 + 1 + 8;
}
