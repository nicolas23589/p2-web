/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoPacienteService } from './medico-paciente.service';
import { MedicoEntity } from 'src/medico/medico.entity';
import { PacienteEntity } from 'src/paciente/paciente.entity';
import { MedicoPacienteController } from './medico-paciente.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([MedicoEntity, PacienteEntity]), 
  ],
  providers: [MedicoPacienteService],
  exports: [MedicoPacienteService],
  controllers: [MedicoPacienteController],
})
export class MedicoPacienteModule {}
