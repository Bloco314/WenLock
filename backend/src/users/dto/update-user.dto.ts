import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'Maria Silva',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Endereço de e-mail do usuário',
    example: 'maria.silva@exemplo.com',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Matrícula numérica do usuário',
    example: '20241001',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'A matrícula não pode ser vazia' })
  @Matches(/^\d+$/, {
    message: 'A matrícula deve conter apenas números',
  })
  registration?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do usuário',
    example: 'a1b2c3',
    minLength: 6,
    maxLength: 6,
  })
  @IsOptional()
  @Length(6, 6, {
    message: 'A senha deve ter exatamente 6 caracteres',
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'A senha deve conter apenas letras e números',
  })
  password?: string;
}
