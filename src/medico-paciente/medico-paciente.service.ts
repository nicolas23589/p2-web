


import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicoPacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async addMedicoToPaciente(pacienteId: number, medicoId: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'], // Incluye los médicos ya asignados.
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

    paciente.medicos.push(medico); // Añade el médico a la lista de médicos del paciente.
    return await this.pacienteRepository.save(paciente);
  }

}
