import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: number;

  @ApiProperty({ example: 'Maria Silva' })
  name: string;

  @ApiProperty({ example: 'maria.silva@exemplo.com' })
  email: string;

  @ApiProperty({ example: '20241001' })
  registration: string;

  @ApiProperty({ example: '2026-10-02T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-10-02T12:00:00.000Z' })
  updatedAt: Date;
}
