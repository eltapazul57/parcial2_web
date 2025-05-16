/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
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

    //FALTA inscribirse a actividad




}
