/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

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
            throw new BusinessLogicException('Semestre inválido.', BusinessError.BAD_REQUEST);
        }
        if(!(correo.includes('@')&& correo.includes('.com'))){
            throw new BusinessLogicException('Debe de incluir un correo valido', BusinessError.BAD_REQUEST);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity>{
        const estudiante = await this.estudianteRepository.findOne({where: { id }});
        if (!estudiante){
            throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        }
        return estudiante;
    }

    async inscribirseActividad(estudianteId: string, actividadId: string): Promise<EstudianteEntity> {
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId }, relations: ['actividades'] });
        if (!estudiante) {
            throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        }

        const actividad = await this.actividadRepository.findOne({ where: { id: actividadId }, relations: ['estudiantes'] });
        if (!actividad) {
            throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);
        }

        if (actividad.estado !== 0) {
            throw new BusinessLogicException('La actividad no está abierta para inscripciones', BusinessError.PRECONDITION_FAILED);
        }

        const yaInscrito = estudiante.actividades.some(act => act.id === actividad.id);
        if (yaInscrito) {
            throw new BusinessLogicException('El estudiante ya está inscrito en esta actividad', BusinessError.PRECONDITION_FAILED);
        }

        if (actividad.estudiantes.length >= actividad.cupoMaximo) {
            throw new BusinessLogicException('No hay cupos disponibles en esta actividad', BusinessError.PRECONDITION_FAILED);
        }

        estudiante.actividades.push(actividad);
        await this.estudianteRepository.save(estudiante);

        return estudiante;
    }




}
