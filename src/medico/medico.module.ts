/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MedicoController } from './medico.controller';

@Module({
  controllers: [MedicoController]
})
export class MedicoModule {}
