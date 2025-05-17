/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResenaEntity } from './resena.entity';
import { ResenaController } from './resena.controller';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResenaEntity, ActividadEntity, EstudianteEntity])],
  controllers: [ResenaController],
  providers: [ResenaService]
})
export class ResenaModule {}
