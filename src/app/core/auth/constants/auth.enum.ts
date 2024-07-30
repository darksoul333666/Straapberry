export enum ErrorsLogin {
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
}

export enum ErrorsRegister {
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
}

export const ErrorsMessage = {
    [ErrorsRegister.USER_ALREADY_EXISTS] : 'El correo ya se encuentra registrado con otro usuario.',
    [ErrorsLogin.EMAIL_NOT_FOUND] : 'El correo no se encuentra registrado.',
    [ErrorsLogin.INVALID_PASSWORD] : 'La contraseña es incorrecta.'
}