/* eslint-disable prettier/prettier */


import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { faker } from '@faker-js/faker';
import { ActividadEntity } from '../actividad/actividad.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: Repository<EstudianteEntity>;
  let actividadRepository: Repository<ActividadEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    actividadRepository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    try {
      await estudianteRepository.clear();
      estudianteList = [];

      for (let i = 0; i < 5; i++) {
        const estudiante: EstudianteEntity = await estudianteRepository.save({
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

  it('should return a new estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: '',
      cedula: 1234567890,
      nombre: 'Manuel Gomez',
      correo: 'm.g@g.com',
      programa: 'Ingenieria de Sistemas',
      semestre: 6,
      actividades: [],
      resenas: []
    };
    const newEstudiante = await service.crearEstudiante(estudiante);  

    expect(newEstudiante).not.toBeNull();
    expect(newEstudiante.cedula).toEqual(estudiante.cedula);
    expect(newEstudiante.nombre).toEqual(estudiante.nombre);
    expect(newEstudiante.correo).toEqual(estudiante.correo);
    expect(newEstudiante.programa).toEqual(estudiante.programa);
    expect(newEstudiante.semestre).toEqual(estudiante.semestre);
    expect(newEstudiante.id).not.toBeNull();
  });

  it('should throw an error when creating an estudiante with invalid semestre', async () => {
    const estudiante: EstudianteEntity = {
      id: '',
      cedula: 1234567890,
      nombre: 'Manuel Gomez',
      correo: 'm.g@g.com',
      programa: 'Ingenieria de Sistemas',
      semestre: 15,
      actividades: [],
      resenas: []
    };
    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", 'Semestre inválido.');
  });

  it('should throw an error when creating an estudiante with invalid correo', async () => {
    const estudiante: EstudianteEntity = {
      id: '',
      cedula: 1234567890,
      nombre: 'Manuel Gomez',
      correo: 'm.g@g',
      programa: 'Ingenieria de Sistemas',
      semestre: 6,
      actividades: [],
      resenas: []
    };
    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty("message",'Debe de incluir un correo valido');
  });

  it('should return an estudiante by id', async () => {
    const storedEstudiante: EstudianteEntity = estudianteList[0];
    const foundEstudiante: EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);

    expect(foundEstudiante).not.toBeNull();
    expect(foundEstudiante.cedula).toEqual(storedEstudiante.cedula);
    expect(foundEstudiante.nombre).toEqual(storedEstudiante.nombre);
    expect(foundEstudiante.correo).toEqual(storedEstudiante.correo);
    expect(foundEstudiante.programa).toEqual(storedEstudiante.programa);
    expect(foundEstudiante.semestre).toEqual(storedEstudiante.semestre);
  });

  it('should throw an error for an invalid estudiante id', async () => {
    await expect(() => service.findEstudianteById('0')).rejects.toHaveProperty("message",'Estudiante no encontrado');
  });

  it('should enroll an estudiante in an actividad', async () => {
    const actividad: ActividadEntity = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 40,
      estado: 0,
      estudiantes: [],
    });
    
    const estudiante = estudianteList[0];
    
    const enrolledEstudiante = await service.inscribirseActividad(estudiante.id, actividad.id);
    
    expect(enrolledEstudiante).not.toBeNull();
    expect(enrolledEstudiante.actividades.length).toEqual(1);
    expect(enrolledEstudiante.actividades[0].id).toEqual(actividad.id);
  });

  it('should throw an error when trying to enroll in a closed activity', async () => {
    const actividadCerrada = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 40,
      estado: 1,
      estudiantes: [],
    });
    
    const estudiante = estudianteList[0];
    
    await expect(
      service.inscribirseActividad(estudiante.id, actividadCerrada.id)
    ).rejects.toHaveProperty("message" ,'La actividad no está abierta para inscripciones');
  });



});
