/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MedicoPacienteService } from './medico-paciente.service';
import { PacienteEntity } from '../paciente/paciente.entity';
import { MedicoEntity } from '../medico/medico.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MedicoPacienteService', () => {
  let service: MedicoPacienteService;
  let pacienteRepository: Repository<PacienteEntity>;
  let medicoRepository: Repository<MedicoEntity>;

  const mockPaciente = {
    id: '1',
    nombre: 'Paciente 1',
    medicos: [],
  };

  const mockMedico = {
    id: '1',
    nombre: 'Dr. Juan',
    especialidad: 'Cardiología',
  };

  const mockPacienteRepository = {
    findOne: jest.fn().mockResolvedValue(mockPaciente),
    save: jest.fn().mockResolvedValue(mockPaciente),
  };

  const mockMedicoRepository = {
    findOne: jest.fn().mockResolvedValue(mockMedico),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoPacienteService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useValue: mockPacienteRepository,
        },
        {
          provide: getRepositoryToken(MedicoEntity),
          useValue: mockMedicoRepository,
        },
      ],
    }).compile();

    service = module.get<MedicoPacienteService>(MedicoPacienteService);
    pacienteRepository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
    medicoRepository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('addMedicoToPaciente', () => {
    it('debería lanzar un error si el paciente no existe', async () => {
      mockPacienteRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.addMedicoToPaciente('999', '1')).rejects.toThrow(
        new NotFoundException('El paciente con ID 999 no existe.'),
      );
    });

    it('debería lanzar un error si el médico no existe', async () => {
      mockMedicoRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.addMedicoToPaciente('1', '999')).rejects.toThrow(
        new NotFoundException('El médico con ID 999 no existe.'),
      );
    });

    it('debería lanzar un error si el paciente ya tiene 5 médicos asignados', async () => {
      const pacienteConMedicos = { ...mockPaciente, medicos: [mockMedico, mockMedico, mockMedico, mockMedico, mockMedico] };
      mockPacienteRepository.findOne.mockResolvedValueOnce(pacienteConMedicos);
      await expect(service.addMedicoToPaciente('1', '1')).rejects.toThrow(
        new BadRequestException('Un paciente no puede tener más de 5 médicos asignados.'),
      );
    });

    it('debería asociar un médico al paciente correctamente', async () => {
      const result = await service.addMedicoToPaciente('1', '1');
      expect(result.medicos).toContain(mockMedico);
      expect(mockPacienteRepository.save).toHaveBeenCalledWith(mockPaciente);
    });
  });
});
