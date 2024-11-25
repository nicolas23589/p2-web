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
  import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
  import { DiagnosticoService } from './diagnostico.service';
  import { DiagnosticoEntity } from './diagnostico.entity';
  
  @Controller('diagnostico')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class DiagnosticoController {
    constructor(private readonly diagnosticoService: DiagnosticoService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() diagnostico: Partial<DiagnosticoEntity>): Promise<DiagnosticoEntity> {
      return await this.diagnosticoService.create(diagnostico);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<DiagnosticoEntity[]> {
      return await this.diagnosticoService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<DiagnosticoEntity> {
      return await this.diagnosticoService.findOne(id);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
      await this.diagnosticoService.delete(id);
    }
  }
  