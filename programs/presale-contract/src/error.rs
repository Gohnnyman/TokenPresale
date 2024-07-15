use anchor_lang::prelude::*;

#[error_code]
pub enum PresaleContractError {
    #[msg("User not found")]
    UserNotFound,
    #[msg("Insufficient balance")]
    InsufficientBalance,
    #[msg("Unauthorized access")]
    Unauthorized,
}
