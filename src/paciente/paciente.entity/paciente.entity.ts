/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { DiagnosticoEntity } from 'src/diagnostico/diagnostico.entity/diagnostico.entity';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genero: string;

  @Column()
  nombre: string;

  @ManyToMany(() => MedicoEntity, (medico) => medico.pacientes)
  medicos: MedicoEntity[];

  @ManyToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.pacientes)
  @JoinTable()
  diagnosticos: DiagnosticoEntity[];
}
