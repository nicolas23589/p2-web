/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { MedicoService } from './medico.service';
import { MedicoEntity } from './medico.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MedicoService', () => {
  let service: MedicoService;
  let repository: Repository<MedicoEntity>;

  const mockMedico = {
    id: '1',
    nombre: 'Dr. Juan',
    especialidad: 'Cardiología',
    pacientes: [],
  };

  const mockMedicoRepository = {
    save: jest.fn().mockResolvedValue(mockMedico),
    findOne: jest.fn().mockResolvedValue(mockMedico),
    find: jest.fn().mockResolvedValue([mockMedico]),
    delete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(MedicoEntity),
          useValue: mockMedicoRepository,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
    repository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));
  });

  it('debería ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería lanzar un error si el nombre o especialidad están vacíos', async () => {
      const medicoInvalido = { nombre: '', especialidad: '' };
      await expect(service.create(medicoInvalido as MedicoEntity)).rejects.toThrow(
        new BadRequestException('Asegurate de que incluiste nombre y especialidad'),
      );
    });

    it('debería crear un médico correctamente', async () => {
      const medicoValido = { nombre: 'Dr. Luis', especialidad: 'Dermatología' };
      const result = await service.create(medicoValido as MedicoEntity);
      expect(result).toEqual(mockMedico);
      expect(mockMedicoRepository.save).toHaveBeenCalledWith(medicoValido);
    });
  });

  describe('findOne', () => {
    it('debería retornar un médico por ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockMedico);
      expect(mockMedicoRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['pacientes'],
      });
    });

    it('debería lanzar un error si el médico no existe', async () => {
      mockMedicoRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne('999')).rejects.toThrow(
        new NotFoundException('El médico con ID 999 no existe.'),
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los médicos', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockMedico]);
      expect(mockMedicoRepository.find).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('debería eliminar un médico correctamente', async () => {
      const result = await service.delete('1');
      expect(result).toBeUndefined();
      expect(mockMedicoRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar un error si el médico tiene pacientes asociados', async () => {
      const medicoConPacientes = { ...mockMedico, pacientes: ['paciente1'] };
      mockMedicoRepository.findOne.mockResolvedValueOnce(medicoConPacientes);
      await expect(service.delete('1')).rejects.toThrow(
        new BadRequestException('No se puede eliminar un médico con al menos un pacientes asociados.'),
      );
    });

    it('debería lanzar un error si el médico no existe al intentar eliminar', async () => {
      mockMedicoRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.delete('999')).rejects.toThrow(
        new NotFoundException('El médico con ID 999 no existe.'),
      );
    });
  });
});
