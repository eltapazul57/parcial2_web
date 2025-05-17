/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { faker } from '@faker-js/faker';;
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ActividadService', () => {
  let service: ActividadService;
  let actividadRepository: Repository<ActividadEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;
  let actividadList: ActividadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    actividadRepository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    try {
      await actividadRepository.clear();
      actividadList = [];

      for (let i = 0; i < 5; i++) {
        const actividad: ActividadEntity = await actividadRepository.save({
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

  it('should create an actividad', async () => {
    const actividad: ActividadEntity = {
      id: '',
      titulo: 'Titulo de pruebaaaaa',
      fecha: faker.date.past().toISOString(), 
      cupoMaximo: faker.number.int({ min: 30, max: 60 }),
      estado: 0,
      estudiantes: [],
      resenas: [],
    };

    const createdActividad = await service.crearActividad(actividad);
    expect(createdActividad).toBeDefined();
    expect(createdActividad.id).not.toBeNull();
    expect(createdActividad.titulo).toEqual(actividad.titulo);
    expect(createdActividad.fecha).toEqual(actividad.fecha);
    expect(createdActividad.cupoMaximo).toEqual(actividad.cupoMaximo);
    expect(createdActividad.estado).toEqual(actividad.estado);
  });

  it('should throw an error if the title is less than 15 characters', async () => {
    const actividad: ActividadEntity = {
      id: '',
      titulo: 'Titulo',
      fecha: faker.date.past().toISOString(), 
      cupoMaximo: faker.number.int({ min: 30, max: 60 }),
      estado: 0,
      estudiantes: [],
      resenas: [],
    };

    await expect(service.crearActividad(actividad)).rejects.toThrowError('El titulo debe de tener más de 15 caracteres');
  });

  it('should throw an error if the estado is not 0', async () => {
    const actividad: ActividadEntity = {
      id: '',
      titulo: 'Titulo de pruebaaaaa',
      fecha: faker.date.past().toISOString(), 
      cupoMaximo: faker.number.int({ min: 30, max: 60 }),
      estado: 1,
      estudiantes: [],
      resenas: [],
    };

    await expect(service.crearActividad(actividad)).rejects.toThrowError('La actividad debe de estar abierta');
  });

  it('should change the activity state to finalizada when the cupo is full', async () => {
    const actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 5,
      estado: 0,
      estudiantes: [],
    });
    
    for (let i = 0; i < 5; i++) {
      const estudiante = await estudianteRepository.save({
        cedula: parseInt(faker.string.numeric(10)),
        nombre: faker.person.fullName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
        actividades: [],
      });
      estudiante.actividades.push(actividad);
      actividad.estudiantes.push(estudiante);
    }

    await actividadRepository.save(actividad);

    const result = await service.cambiarEstado(actividad.id, 2);
    expect(result.estado).toBe(2);
  });

  it('should throw an error if the cupo is not full when changing to cerrada', async () => {
    const actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 5,
      estado: 0,
      estudiantes: [],
    });

    for (let i = 0; i < 3; i++) {
      const estudiante = await estudianteRepository.save({
        cedula: parseInt(faker.string.numeric(10)),
        nombre: faker.person.fullName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
        actividades: [],
      });
      estudiante.actividades.push(actividad);
      actividad.estudiantes.push(estudiante);
    }

    await actividadRepository.save(actividad);

    await expect(service.cambiarEstado(actividad.id, 1)).rejects.toThrow('No se puede cerrar la actividad. Debe tener al menos el 80% del cupo inscrito.');
  });

  it('should return an activity by date', async () => {
    const actividad = actividadList[0];
    const result = await service.findActividadesByFecha(actividad.fecha);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].fecha).toEqual(actividad.fecha);
  });

  it('should throw an error if no activities are found for the given date', async () => {
    const fechaInvalida = '000-00-00T00:00:00.000Z';
    await expect(service.findActividadesByFecha(fechaInvalida)).rejects.toThrow('No hay actividades con la fecha dada');
  });

});