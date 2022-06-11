import { IsEmpty } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class AuthCredentialDto {
    @IsEmpty()
    username: string;

    @IsEmpty()
    password: string;
}