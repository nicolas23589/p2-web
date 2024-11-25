/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(DiagnosticoEntity)
    private readonly diagnosticoRepository: Repository<DiagnosticoEntity>,
  ) {}

  async create(diagnostico: Partial<DiagnosticoEntity>): Promise<DiagnosticoEntity> {

    if (diagnostico.descripcion.length > 200) {
      throw new BadRequestException('La descripción no puede exceder los 200 caracteres.');
    }
    const nuevoDiagnostico = this.diagnosticoRepository.create(diagnostico);
    return await this.diagnosticoRepository.save(nuevoDiagnostico);
  }

  async findOne(id: string): Promise<DiagnosticoEntity> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!diagnostico) {
      throw new NotFoundException(`El diagnóstico con ID ${id} no existe.`);
    }
    return diagnostico;
  }

  async findAll(): Promise<DiagnosticoEntity[]> {
    return await this.diagnosticoRepository.find();
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.delete(diagnostico.id);
  }
}
