/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';

@Entity()
export class DiagnosticoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => PacienteEntity, (paciente) => paciente.diagnosticos)
  pacientes: PacienteEntity[];
}
