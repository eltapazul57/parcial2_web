/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResenaEntity } from './resena.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';


@Injectable()
export class ResenaService {
    constructor(
            @InjectRepository(ResenaEntity)
            private readonly resenaRepository: Repository<ResenaEntity>,

            @InjectRepository(ActividadEntity)
            private readonly actividadRepository: Repository<ActividadEntity>,

            @InjectRepository(EstudianteEntity)
            private readonly estudianteRepository: Repository<EstudianteEntity>,
        ) {}

        async agregarResena(resena: ResenaEntity, estudianteId: string, actividadId: string): Promise<ResenaEntity> {

            const estudiante = await this.estudianteRepository.findOne({where: { id: estudianteId }, relations: ['actividades'] });
            if (!estudiante) {
                throw new Error('Estudiante no encontrado');
            }

            const actividad = await this.actividadRepository.findOne({where: { id: actividadId }, relations: ['estudiantes'] });
            if (!actividad) {
                throw new Error('Actividad no encontrada');
            }

            if (actividad.estado !== 2) {
                throw new Error('La actividad no está finalizada para reseñas');
            }
            
            const estaInscrito = estudiante.actividades.some(act => act.id === actividad.id);
            if (!estaInscrito) {
                throw new Error('El estudiante no está inscrito en esta actividad');
            }

            resena.estudiante = estudiante;
            resena.actividad = actividad;

            return await this.resenaRepository.save(resena);
        }


}
