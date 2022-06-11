import { IsEmpty } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class AuthCredentialDto {
    @PrimaryColumn()
    id: number;
    
    @IsEmpty()
    username: string;

    @IsEmpty()
    password: string;
}