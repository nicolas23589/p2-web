/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Param,
    HttpCode,
    HttpStatus,
    UseInterceptors,
  } from '@nestjs/common';
  import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
  import { MedicoPacienteService } from './medico-paciente.service';
  import { PacienteEntity } from '../paciente/paciente.entity';
  
  @Controller('paciente')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class MedicoPacienteController {
    constructor(private readonly medicoPacienteService: MedicoPacienteService) {}
  
    @Post(':pacienteId/medico/:medicoId')
    @HttpCode(HttpStatus.CREATED)
    async addMedicoToPaciente(
      @Param('pacienteId') pacienteId: string,
      @Param('medicoId') medicoId: string,
    ): Promise<PacienteEntity> {
      return await this.medicoPacienteService.addMedicoToPaciente(pacienteId, medicoId);
    }
  }
  