import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário (apenas letras)',
    example: 'Maria Silva',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras',
  })
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'maria.silva@exemplo.com',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'Matrícula numérica do usuário',
    example: '20241001',
  })
  @IsNotEmpty({ message: 'A matrícula é obrigatória' })
  @Matches(/^\d+$/, { message: 'A matrícula deve conter apenas números' })
  registration: string;

  @ApiProperty({
    description: 'Senha de acesso (exatamente 6 caracteres alfanuméricos)',
    example: 'a1b2c3',
    minLength: 6,
    maxLength: 6,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @Length(6, 6, { message: 'A senha deve ter exatamente 6 caracteres' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'A senha deve conter apenas letras e números',
  })
  password: string;
}
