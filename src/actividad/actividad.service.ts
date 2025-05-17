/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ActividadService {

    constructor(
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,

    ) {}

    async crearActividad(actividad: ActividadEntity): Promise <ActividadEntity>{
        const titulo = actividad.titulo;
        if(titulo.length < 15 ){
            throw new BusinessLogicException('El titulo debe de tener más de 15 caracteres', BusinessError.BAD_REQUEST);
        }
        const estado = actividad.estado;
        if(estado !== 0){
            throw new BusinessLogicException('La actividad debe de estar abierta', BusinessError.PRECONDITION_FAILED);
        }
        return await this.actividadRepository.save(actividad)
    }

    async cambiarEstado(id: string, nuevoEstado: number): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOne({ where: { id }, relations: ['estudiantes'] });
        if (!actividad) {
        throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);
        }

        if (nuevoEstado === 1) {
        const porcentajeInscritos = (actividad.estudiantes.length / actividad.cupoMaximo) * 100;
            if (porcentajeInscritos < 80) {
                throw new BusinessLogicException('No se puede cerrar la actividad. Debe tener al menos el 80% del cupo inscrito.', BusinessError.PRECONDITION_FAILED);
            }
        } else if (nuevoEstado === 2) {
            if (actividad.estudiantes.length < actividad.cupoMaximo) {
                throw new BusinessLogicException('No se puede finalizar la actividad. Todavía hay cupos disponibles.', BusinessError.PRECONDITION_FAILED);
            }
        }

        actividad.estado = nuevoEstado;
        await this.actividadRepository.save(actividad);
        return actividad;
    }

    async findActividadesByFecha(fecha: string): Promise <ActividadEntity[]>{
        const actividades = await this.actividadRepository.find({where: {fecha}});
        if (!actividades || actividades.length === 0) {
            throw new BusinessLogicException('No hay actividades con la fecha dada', BusinessError.NOT_FOUND);
        }
        return actividades;
    }

}
