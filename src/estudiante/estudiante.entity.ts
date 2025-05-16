/* eslint-disable prettier/prettier */
import { ResenaEntity } from 'src/resena/resena.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'int'})
    cedula: number;

    @Column()
    nombre:string;

    @Column()
    correo:string;

    @Column()
    programa:string;

    @Column({type: 'int'})
    semestre:number;

    //RELACIONES
    @OneToMany(() => ResenaEntity, resena => resena.estudiante)
    resenas: ResenaEntity[];

    @ManyToMany(() => ActividadEntity, actividad => actividad.estudiantes)
    actividades: ActividadEntity[];



}
