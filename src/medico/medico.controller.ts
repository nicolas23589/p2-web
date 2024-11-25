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
  import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
  import { MedicoService } from './medico.service';
  import { MedicoEntity } from './medico.entity';
  
  @Controller('medico')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() medico: MedicoEntity): Promise<MedicoEntity> {
      return await this.medicoService.create(medico);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<MedicoEntity[]> {
      return await this.medicoService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<MedicoEntity> {
      return await this.medicoService.findOne(id);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
      await this.medicoService.delete(id);
    }
  }
  