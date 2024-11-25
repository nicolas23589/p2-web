/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';

@Module({
  controllers: [PacienteController]
})
export class PacienteModule {}
