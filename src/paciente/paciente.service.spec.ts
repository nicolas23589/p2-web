import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente.entity/paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<Paciente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
  });

  describe('create', () => {
    it('debería crear un paciente correctamente', async () => {
      const pacienteData = { nombre: 'Juan Pérez', genero: 'masculino', medicos:[], diagnosticos:[] };
      const paciente: Paciente = { id: '1', ...pacienteData };

      jest.spyOn(repository, 'create').mockReturnValue(paciente);
      jest.spyOn(repository, 'save').mockResolvedValue(paciente);

      const result = await service.create(pacienteData);

      expect(result).toEqual(paciente);
      expect(repository.create).toHaveBeenCalledWith(pacienteData);
      expect(repository.save).toHaveBeenCalledWith(paciente);
    });

    it('debería lanzar una excepción si el nombre del paciente tiene menos de 3 caracteres', async () => {
      const pacienteData = { nombre: 'Ju' };

      await expect(service.create(pacienteData)).rejects.toThrowError(
        new BadRequestException('El nombre del paciente debe tener al menos 3 caracteres.')
      );
    });
  });
});
