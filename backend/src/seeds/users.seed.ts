import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { SeedModule } from './seed.module.js';
import { User } from '../users/entities/user.entity.js';

async function seed() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  try {
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));

    const email = 'admin@wenlock.com';

    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      console.log('Usuário administrador já existe.');
      return;
    }

    const passwordHash = await bcrypt.hash('123456', 10);

    const user = userRepository.create({
      name: 'Administrador',
      email,
      registration: '000001',
      password: passwordHash,
    });

    await userRepository.save(user);

    console.log('ADMINISTRADOR CRIADO');
    console.log(`Email: ${email}`);
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

seed();
