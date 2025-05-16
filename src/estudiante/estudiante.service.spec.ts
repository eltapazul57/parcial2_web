/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    try {
      await repository.clear();
      estudianteList = [];

      for (let i = 0; i < 5; i++) {
        const estudiante: EstudianteEntity = await repository.save({
          cedula: parseInt(faker.string.numeric(10), 10),
          nombre: faker.person.fullName(),
          correo: faker.internet.email(),
          programa: faker.lorem.word(),
          semestre: faker.number.int({ min: 1, max: 10 }),
          actividades: [],
          resenas: []
        });
        estudianteList.push(estudiante);
      }
    } catch (error) {
      console.error('Error al hacer seed de estudiantes:', error);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
