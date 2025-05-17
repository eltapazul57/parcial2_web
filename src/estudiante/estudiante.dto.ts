/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class EstudianteDto {
    
    @IsNotEmpty()
    @IsNumber()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    correo: string;

    @IsNotEmpty()
    @IsString()
    programa: string;

    @IsNotEmpty()
    @IsNumber()
    semestre: number;

}
