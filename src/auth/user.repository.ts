import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;
        //const user = this.create({username, password});

        //salt 생성
        const salt = await bcrypt.genSalt();

        //password를 hash화
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({username, password: hashedPassword})

        try {
            await this.save(user);
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}