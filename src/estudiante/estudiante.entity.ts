/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
