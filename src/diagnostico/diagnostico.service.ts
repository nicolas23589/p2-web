import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostico } from './diagnostico.entity/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
  ) {}

  async create(diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {

    if (diagnostico.descripcion.length > 200) {
      throw new BadRequestException('La descripción no puede exceder los 200 caracteres.');
    }
    const nuevoDiagnostico = this.diagnosticoRepository.create(diagnostico);
    return await this.diagnosticoRepository.save(nuevoDiagnostico);
  }

  async findOne(id: string): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!diagnostico) {
      throw new NotFoundException(`El diagnóstico con ID ${id} no existe.`);
    }
    return diagnostico;
  }

  async findAll(): Promise<Diagnostico[]> {
    return await this.diagnosticoRepository.find();
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.delete(diagnostico.id);
  }
}
