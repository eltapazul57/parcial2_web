/* eslint-disable prettier/prettier */
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity()
export class ResenaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comentario:string;

    @Column({type: 'int'})
    calificacion: number;

    @Column()
    fecha: string;

    //Relación reseña a estudiante

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.resenas)
    estudiante: EstudianteEntity

    @ManyToOne(() => ActividadEntity, actividad => actividad.resenas)
    actividad: ActividadEntity;

}
