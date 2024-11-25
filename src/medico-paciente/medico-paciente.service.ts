/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from '../paciente/paciente.entity';
import { MedicoEntity } from '../medico/medico.entity';

@Injectable()
export class MedicoPacienteService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'], 
    });
    if (!paciente) {
      throw new NotFoundException(`El paciente con ID ${pacienteId} no existe.`);
    }

    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
    if (!medico) {
      throw new NotFoundException(`El médico con ID ${medicoId} no existe.`);
    }

    if (paciente.medicos.length >= 5) {
      throw new BadRequestException('Un paciente no puede tener más de 5 médicos asignados.');
    }

    paciente.medicos.push(medico); 
    return await this.pacienteRepository.save(paciente);
  }

}
