/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ResenaDto {

    @IsNotEmpty()
    @IsString()
    comentario:string;

    @IsNotEmpty()
    @IsNumber()
    calificacion: number;

    @IsNotEmpty()
    @IsString()
    fecha: string;

}
