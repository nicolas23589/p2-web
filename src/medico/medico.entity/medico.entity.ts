/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';

@Entity()
export class MedicoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @ManyToMany(() => PacienteEntity, (paciente) => paciente.medicos)
  @JoinTable()
  pacientes: PacienteEntity[];
}
