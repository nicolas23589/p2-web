import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from 'typeorm';
import { Medico } from 'src/medico/medico.entity/medico.entity';
import { Diagnostico } from 'src/diagnostico/diagnostico.entity/diagnostico.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genero: string;

  @Column()
  nombre: string;

  @ManyToMany(() => Medico, (medico) => medico.pacientes)
  medicos: Medico[];

  @ManyToMany(() => Diagnostico, (diagnostico) => diagnostico.pacientes)
  @JoinTable()
  diagnosticos: Diagnostico[];
}
