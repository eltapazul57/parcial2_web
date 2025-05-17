/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
//import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

import { ActividadService } from './actividad.service';
import { ActividadDto } from './actividad.dto';
import { ActividadEntity } from './actividad.entity';

@Controller('actividad')
export class ActividadController {
    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async crearActividad(@Body() actividadDto: ActividadDto) {

        const actividad: ActividadEntity = plainToInstance(ActividadEntity, actividadDto);
        return await this.actividadService.crearActividad(actividad);
    }

    @Put(':id/estado')
    async cambiarEstado(@Param('id') id: string, @Body('estado') nuevoEstado: number) {
        return await this.actividadService.cambiarEstado(id, nuevoEstado);
    }

    @Get('fecha/:fecha')
    async buscarPorFecha(@Param('fecha') fecha: string) {
        return await this.actividadService.findActividadesByFecha(fecha);
    }

}
