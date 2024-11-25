/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicoPacienteModule } from './medico-paciente/medico-paciente.module';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from './medico/medico.entity';
import { PacienteEntity } from './paciente/paciente.entity';
import { DiagnosticoEntity } from './diagnostico/diagnostico.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MedicoPacienteModule, MedicoModule, PacienteModule, DiagnosticoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'AlcantaSilla456',
      database: 'postgres',
      entities: [MedicoEntity, PacienteEntity, DiagnosticoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
})
export class AppModule {}
