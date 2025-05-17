/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':id')
    async findEstudianteById(@Param('id') id: string) {
        return await this.estudianteService.findEstudianteById(id);
    }

    @Post(':estudianteId/inscribirse/:actividadId')
    async inscribirseActividad(@Param('estudianteId') estudianteId: string, @Param('actividadId') actividadId: string) {
        return await this.estudianteService.inscribirseActividad(estudianteId, actividadId);
    }
}
