import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { UsersPaginationDto } from './dto/users-pagination.dto.js';
import { UsersPaginationSearchDto } from './dto/user-pagination-search.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticar usuário' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos (erro de validação).',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiOkResponse({
    description: 'Lista de usuários retornada com sucesso.',
    type: [UserResponseDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Listar usuários com paginação' })
  @ApiOkResponse({
    description: 'Usuários paginados retornados com sucesso.',
    type: [UserResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Parâmetros de paginação inválidos.',
  })
  findPaginated(@Query() paginationDto: UsersPaginationDto) {
    return this.usersService.findPaginated(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get('paginated-search')
  @ApiOperation({ summary: 'Listar usuários com paginação' })
  @ApiOkResponse({
    description: 'Usuários paginados retornados com sucesso.',
    type: [UserResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Parâmetros de paginação inválidos.',
  })
  findPaginatedSearch(@Query() paginationDto: UsersPaginationSearchDto) {
    return this.usersService.findPaginatedSearch(
      paginationDto.textSearch ?? '',
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID numérico do usuário', example: 1 })
  @ApiOkResponse({
    description: 'Usuário encontrado com sucesso.',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um usuário' })
  @ApiParam({ name: 'id', description: 'ID numérico do usuário', example: 1 })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso.',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  @ApiBadRequestResponse({
    description: 'Dados fornecidos inválidos.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiParam({ name: 'id', description: 'ID numérico do usuário', example: 1 })
  @ApiOkResponse({
    description: 'Usuário removido com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({
    summary: 'Redefinir senha do usuário',
    description:
      'Redefine a senha do usuário utilizando a senha padrão configurada no ambiente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha redefinida com sucesso.',
    schema: {
      example: {
        message: 'Senha redefinida com sucesso.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'E-mail inválido.',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto.email);
  }
}
