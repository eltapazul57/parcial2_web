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
/* 
AQUI VAN LOS IMPORTS DE LAS ENTIDADES

*/


@Module({
  imports: [/* Aqui van los import de Entidad Module*/
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5433,
     username: 'postgres',
     password: 'postgres',
     database: 'parcial2',
     entities: [/* Aqui van las entidades entity */],
     dropSchema: true,
     synchronize: true
     
   }), EstudianteModule, ActividadModule,
 ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
