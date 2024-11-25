/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { PacienteEntity } from './paciente.entity/paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
  });

  describe('create', () => {
    it('debería crear un paciente correctamente', async () => {
      const pacienteData = { nombre: 'Juan', genero: 'masculino', medicos:[], diagnosticos:[] };
      const paciente: PacienteEntity = { id: '1', ...pacienteData };

      jest.spyOn(repository, 'create').mockReturnValue(paciente);
      jest.spyOn(repository, 'save').mockResolvedValue(paciente);

      const result = await service.create(pacienteData);

      expect(result).toEqual(paciente);
      expect(repository.create).toHaveBeenCalledWith(pacienteData);
      expect(repository.save).toHaveBeenCalledWith(paciente);
    });

    it('bussines exepcion si nombre <3 caracteres', async () => {
      const pacienteData = { nombre: 'xd', genero: 'masculino', medicos:[], diagnosticos:[] };

      await expect(service.create(pacienteData)).rejects.toThrowError(
        new BadRequestException('El nombre del paciente debe tener al menos 3 caracteres.')
      );
    });
  });
});
