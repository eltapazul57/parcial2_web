/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ResenaEntity } from './resena.entity';
import { faker } from '@faker-js/faker';

describe('ResenaService', () => {
  let service: ResenaService;
  let resenaRepository: Repository<ResenaEntity>;
  let actividadRepository: Repository<ActividadEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ResenaService],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
    resenaRepository = module.get<Repository<ResenaEntity>>(getRepositoryToken(ResenaEntity));
    actividadRepository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a review when student is enrolled and activity is finalizada', async () => {
    const actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 5,
      estado: 2,
      estudiantes: [] as EstudianteEntity[],
    });

    const estudiante = await estudianteRepository.save({
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
      actividades: [actividad]
    });

    actividad.estudiantes = [estudiante];
    await actividadRepository.save(actividad);

    const resena = await resenaRepository.save({
      comentario: faker.lorem.sentences(2),
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fecha: new Date().toISOString(),
    }); 

    const result = await service.agregarResena(resena, estudiante.id, actividad.id);

    expect(result).toBeDefined();
    expect(result.comentario).toEqual(resena.comentario);
    expect(result.estudiante.id).toEqual(estudiante.id);
    expect(result.actividad.id).toEqual(actividad.id);
  });

  it('should throw error if actividad is not finalizada  ', async () => {
    const actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 5,
      estado: 1,
      estudiantes: [] as EstudianteEntity[],
    });

    const estudiante = await estudianteRepository.save({
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
      actividades: [actividad]
    });

    actividad.estudiantes = [estudiante];
    await actividadRepository.save(actividad);

    const resena = await resenaRepository.save({
      comentario: faker.lorem.sentences(2),
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fecha: new Date().toISOString(),
    }); 

    await expect(service.agregarResena(resena, estudiante.id, actividad.id)).rejects.toHaveProperty("message", 'La actividad no está finalizada para reseñas');
  });
});


