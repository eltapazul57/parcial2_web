/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await resenaRepository.clear();
    await estudianteRepository.clear();
    await actividadRepository.clear();

    
    const actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(4),
      fecha: faker.date.past().toISOString(),
      cupoMaximo: 30,
      estado: 2,
      
    });

    
    const estudiante = await estudianteRepository.save({
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
      
    });

    //asignar la actividad al estudiante
    estudiante.actividades = [actividad];
    await estudianteRepository.save(estudiante);

    
    await resenaRepository.save({
      comentario: faker.lorem.sentences(2),
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fecha: faker.date.recent().toISOString(),
      estudiante,
      actividad,
    });
  };
});
