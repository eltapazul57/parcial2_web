/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ActividadDto {
    
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    fecha: string;

    @IsNotEmpty()
    @IsNumber()
    cupoMaximo: number;

    @IsNotEmpty()
    @IsNumber()
    estado: number;

    
}
