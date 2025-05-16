/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { faker } from '@faker-js/faker';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;
  let actividadList: ActividadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    try {
      await repository.clear();
      actividadList = [];

      for (let i = 0; i < 5; i++) {
        const actividad: ActividadEntity = await repository.save({
          titulo: faker.lorem.sentence(4),
          fecha: faker.date.past().toISOString(), 
          cupoMaximo: faker.number.int({ min: 30, max: 60 }),
          estado: faker.number.int({ min: 0, max: 2 }),
          estudiantes: [],
        });

        actividadList.push(actividad);
      }

      console.log('Actividades creadas:', actividadList.length);
    } catch (error) {
      console.error('Error al hacer seed de actividades:', error);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
