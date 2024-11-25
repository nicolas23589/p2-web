/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DiagnosticoController } from './diagnostico.controller';

@Module({
  controllers: [DiagnosticoController]
})
export class DiagnosticoModule {}
