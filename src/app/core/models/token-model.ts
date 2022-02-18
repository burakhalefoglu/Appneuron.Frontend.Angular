export class TokenModel{
    success: boolean = false;
    message!: string;
    data: Data = new Data;
    

}

export class Data {
    expiration!: string;
    token!: string;
    claims: string[] = [];

}