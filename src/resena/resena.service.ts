/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResenaEntity } from './resena.entity';
@Injectable()
export class ResenaService {
    constructor(
            @InjectRepository(ResenaEntity)
            private readonly resenaRepository: Repository<ResenaEntity>,
    
        ) {}

        async crearResena(resena: ResenaEntity){
            return this.resenaRepository.save(resena);
        }

}
