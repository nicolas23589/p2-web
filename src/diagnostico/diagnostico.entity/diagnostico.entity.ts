import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Paciente } from 'src/paciente/paciente.entity/paciente.entity';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Paciente, (paciente) => paciente.diagnosticos)
  pacientes: Paciente[];
}
