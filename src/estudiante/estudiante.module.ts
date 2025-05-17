/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteController } from './estudiante.controller';
import { ResenaEntity } from '../resena/resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity, ResenaEntity])],
  controllers: [EstudianteController],
  providers: [EstudianteService]
})
export class EstudianteModule {}
