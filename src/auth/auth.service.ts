import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService 
        //auth 모듈에서 JWT를 등록해서 여기 가져와서 쓸 수 있음
    ) {}

    async signUp(authCredentialDto:AuthCredentialDto):Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        //loging success 라는 메세지 return할 거라서 string으로 타입 줌
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ username });

        //입력한 password값과 db의 user가 가진 password를 비교
        if(user && (await bcrypt.compare(password, user.password))) {
            //return 'login success';
            // 유저 토큰을 생성해서 return => 토큰 생성에는 Secret + Payload 필요
            const payload = { username }; // token을 통해서 정보를 가져가기 쉽기 때문에 payload에
            //중요한 정보를 넣으면 안된다!

            //jwt의 sign이라는 메소드에 payload를 넣어주면 알아서 Secret + Payload 조합으로
            //accessToken을 만들어준다.
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
