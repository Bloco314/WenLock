import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado no sistema.');
    }

    const newUser = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(newUser);

    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        `Usuário com o ID #${id} não foi encontrado.`,
      );
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com o ID #${id} não foi encontrado.`,
      );
    }

    const updatedUser = await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        `Usuário com o ID #${id} não foi encontrado.`,
      );
    }

    await this.userRepository.remove(user);

    return { message: `Usuário #${id} removido com sucesso.` };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('E-mail/Matrícula ou senha inválidos.');
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail/Matrícula ou senha inválidos.');
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      token: 'jwt-token-aqui',
      user: userWithoutPassword,
    };
  }

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return {
      data: usersWithoutPassword,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findPaginatedSearch(
    textSearch: string,
    page: number,
    limit: number,
  ): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [users, total] = await this.userRepository.findAndCount({
      where: {
        name: Like(`%${textSearch}%`),
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return {
      data: usersWithoutPassword,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o e-mail informado não foi encontrado.',
      );
    }

    const defaultPassword = process.env.DEFAULT_PASSWORD;

    if (!defaultPassword) {
      throw new Error('DEFAULT_PASSWORD não configurada.');
    }

    user.password = defaultPassword;

    await this.userRepository.save(user);

    return {
      message: 'Senha redefinida com sucesso.',
    };
  }
}
