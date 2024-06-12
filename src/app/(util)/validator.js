import PasswordValidator from "password-validator";

export const passwordSchema = new PasswordValidator()
export const nameSchema = new PasswordValidator()

passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()

nameSchema
    .is().min(3)
    .is().max(100)
    .has().not().spaces()
    .has().not().digits()
