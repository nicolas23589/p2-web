import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Paciente } from 'src/paciente/paciente.entity/paciente.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @ManyToMany(() => Paciente, (paciente) => paciente.medicos)
  @JoinTable()
  pacientes: Paciente[];
}
