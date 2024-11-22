import { Module } from '@nestjs/common';
import { MedicoPacienteService } from './medico-paciente.service';

@Module({
  providers: [MedicoPacienteService]
})
export class MedicoPacienteModule {}
