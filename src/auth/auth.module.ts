import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'Secret1234', //토큰을 만들 때 이용하는 secret 텍스트
      signOptions: {
        expiresIn: 60 * 60 //유효기간이며 3600초로 한시간 의미
      }
    }),
    TypeOrmModule.forFeature([UserRepository])],//user repository를 module에 등록
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
