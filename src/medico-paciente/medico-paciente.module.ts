/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoPacienteService } from './medico-paciente.service';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([MedicoEntity, PacienteEntity]), // Aquí se registran las entidades
  ],
  providers: [MedicoPacienteService],
  exports: [MedicoPacienteService],
})
export class MedicoPacienteModule {}
