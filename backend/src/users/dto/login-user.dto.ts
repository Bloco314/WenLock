import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'E-mail ou matrícula do usuário',
    example: 'usuario@email.com',
  })
  @IsNotEmpty({ message: 'O e-mail ou matrícula é obrigatório.' })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString()
  password: string;
}
