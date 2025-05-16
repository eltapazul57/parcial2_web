/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { ResenaEntity } from '../resena/resena.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
@Entity()
export class ActividadEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo:string;

    @Column()
    fecha: string;

    @Column({type: 'int'})
    cupoMaximo: number;

    @Column({type: 'int'})
    estado: number;

    @OneToMany(() => ResenaEntity, resena => resena.actividad)
    resenas: ResenaEntity[];

    @ManyToMany(() => EstudianteEntity, estudiante => estudiante.actividades)
    @JoinTable()
    estudiantes: EstudianteEntity[];
}
