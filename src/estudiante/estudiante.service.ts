/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity): Promise <EstudianteEntity>{
        const correo = estudiante.correo;
        const semestresValidos = [1,2,3,4,5,6,7,8,9,10]
        if(!semestresValidos.includes(estudiante.semestre)){
            throw new Error('Semestre inválido.');
        }
        if(!(correo.includes('@')&& correo.includes('.com'))){
            throw new Error('Debe de incluir un correo valido');
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity>{
        const estudiante = await this.estudianteRepository.findOne({where: { id }});
        if (!estudiante){
            throw new Error('Estudiante no encontrado')
        }
        return estudiante;
    }

    async inscribirseActividad(estudianteId: string, actividadId: string): Promise<EstudianteEntity> {
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId }, relations: ['actividades'] });
        if (!estudiante) {
            throw new Error('Estudiante no encontrado');
        }

        const actividad = await this.actividadRepository.findOne({ where: { id: actividadId }, relations: ['estudiantes'] });
        if (!actividad) {
            throw new Error('Actividad no encontrada');
        }

        if (actividad.estado !== 0) {
            throw new Error('La actividad no está abierta para inscripciones');
        }

        const yaInscrito = estudiante.actividades.some(act => act.id === actividad.id);
        if (yaInscrito) {
            throw new Error('El estudiante ya está inscrito en esta actividad');
        }

        if (actividad.estudiantes.length >= actividad.cupoMaximo) {
            throw new Error('No hay cupos disponibles en esta actividad');
        }

        estudiante.actividades.push(actividad);
        await this.estudianteRepository.save(estudiante);

        return estudiante;
    }




}
