/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity';


@Injectable()
export class ActividadService {

    constructor(
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,

    ) {}

    async crearActividad(actividad: ActividadEntity): Promise <ActividadEntity>{
        const titulo = actividad.titulo;
        if(titulo.length < 15 ){
            throw new Error('El titulo debe de tener más de 15 caracteres')
        }
        const estado = actividad.estado;
        if(estado !== 0){
            throw new Error('La actividad debe de estar abierta')
        }
        return await this.actividadRepository.save(actividad)
    }

    /*async cambiarEstado(id:string, estado:number): Promise<ActividadEntity>{
        const actividad = await this.actividadRepository.findOne({where: {id}});
        const 
    }*/

    async findActividadesByFecha(fecha: string): Promise <ActividadEntity[]>{
        const actividades = await this.actividadRepository.find({where: {fecha}});
        if (!actividades){
            throw new Error('No hay actividades con la fecha dada');
        }
        return actividades;
    }

}
