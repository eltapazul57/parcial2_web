/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { ActividadController } from './actividad.controller';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ResenaEntity } from '../resena/resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEntity, EstudianteEntity, ResenaEntity])],
  controllers: [ActividadController],
  providers: [ActividadService]
})
export class ActividadModule {}
