import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicoService } from './medico/medico.service';
import { PacienteService } from './paciente/paciente.service';
import { DiagnosticoService } from './diagnostico/diagnostico.service';
import { MedicoPacienteModule } from './medico-paciente/medico-paciente.module';

@Module({
  controllers: [AppController],
  providers: [AppService, MedicoService, PacienteService, DiagnosticoService],
  imports: [MedicoPacienteModule],
})
export class AppModule {}
