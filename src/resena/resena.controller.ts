/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Body, Controller, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResenaService } from './resena.service';
import { ResenaDto } from './resena.dto';
import { ResenaEntity } from './resena.entity';

@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post(':estudianteId/actividad/:actividadId')
  async agregarResena(@Param('estudianteId') estudianteId: string, @Param('actividadId') actividadId: string, @Body() resenaDto: ResenaDto) {
    const resena: ResenaEntity = plainToInstance(ResenaEntity, resenaDto);
    return await this.resenaService.agregarResena(resena, estudianteId, actividadId);
  }
}
