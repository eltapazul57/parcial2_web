/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/*
Aqui van los imports de los modulos de las entidades
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ResenaModule } from './resena/resena.module';
import { ResenaEntity } from './resena/resena.entity';
import { ActividadEntity } from './actividad/actividad.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';


@Module({
  imports: [EstudianteModule, ActividadModule, ResenaModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5433,
     username: 'postgres',
     password: 'postgres',
     database: 'parcial2',
     entities: [ResenaEntity, ActividadEntity, EstudianteEntity],
     dropSchema: true,
     synchronize: true
     
   }), EstudianteModule, ActividadModule, ResenaModule,
 ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
