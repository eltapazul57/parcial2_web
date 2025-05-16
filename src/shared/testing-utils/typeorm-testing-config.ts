/* eslint-disable prettier/prettier */

import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { ResenaEntity } from 'src/resena/resena.entity';
/* TODO: ACTUALIZAR CUANDO VAYAN QUEDANDO EL RESTO DE ENTIDADES*/

export const TypeOrmTestingConfig = () => {
  return [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [EstudianteEntity, ActividadEntity, ResenaEntity],
     
    }),
    TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity, ResenaEntity]),
  ];
}