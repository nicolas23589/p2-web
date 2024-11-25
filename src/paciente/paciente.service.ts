/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
  ) {}

  async create(paciente: Partial<PacienteEntity>): Promise<PacienteEntity> {
    if (paciente.nombre.length < 3) {
      throw new BadRequestException('El nombre del paciente debe tener al menos 3 caracteres.');
    }
    const nuevoPaciente = this.pacienteRepository.create(paciente);
    return await this.pacienteRepository.save(nuevoPaciente);
  }

  async findOne(id: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },
      relations: ['diagnosticos'], 
    });
    if (!paciente) {
      throw new NotFoundException(`El paciente con ID ${id} no existe.`);
    }
    return paciente;
  }

  async findAll(): Promise<PacienteEntity[]> {
    return await this.pacienteRepository.find({ relations: ['diagnosticos'] });
  }

  async delete(id: string): Promise<void> {
    const paciente = await this.findOne(id);
    if (paciente.diagnosticos && paciente.diagnosticos.length > 0) {
      throw new BadRequestException('No se puede eliminar un paciente con diagnósticos asociados.');
    }
    await this.pacienteRepository.delete(id);
  }
}
