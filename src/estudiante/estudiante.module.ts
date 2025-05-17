/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity])],
  controllers: [EstudianteController],
  providers: [EstudianteService]
})
export class EstudianteModule {}
