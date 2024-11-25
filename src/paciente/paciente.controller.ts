/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseInterceptors,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { PacienteService } from './paciente.service';
  import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
  import { PacienteEntity } from './paciente.entity';
  
  @Controller('paciente')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() paciente: PacienteEntity): Promise<PacienteEntity> {
      return await this.pacienteService.create(paciente);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<PacienteEntity[]> {
      return await this.pacienteService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<PacienteEntity> {
      return await this.pacienteService.findOne(id);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
      await this.pacienteService.delete(id);
    }
  }
  