import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class UsersPaginationSearchDto {
  @ApiProperty({
    description: 'Texto utilizado para pesquisar usuários pelo nome ou e-mail.',
    example: 'João',
    type: String,
  })
  @IsString()
  @Type(() => String)
  textSearch?: string;

  @ApiPropertyOptional({
    description: 'Número da página que será retornada.',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de usuários retornados por página.',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
