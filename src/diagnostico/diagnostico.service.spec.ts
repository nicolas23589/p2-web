/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoService } from './diagnostico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<DiagnosticoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosticoService,
        {
          provide: getRepositoryToken(DiagnosticoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<DiagnosticoEntity>>(getRepositoryToken(DiagnosticoEntity));
  });

  it('debería crear un diagnóstico correctamente si la descripción tiene 200 caracteres o menos', async () => {
    const diagnostico: Partial<DiagnosticoEntity> = {
      descripcion: 'Descripción válida'
    };

    const savedDiagnostico = {
      id: '1',
      ...diagnostico,
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedDiagnostico as DiagnosticoEntity);
    jest.spyOn(repository, 'save').mockResolvedValue(savedDiagnostico as DiagnosticoEntity);

    const result = await service.create(diagnostico);

    expect(result).toEqual(savedDiagnostico);
    expect(repository.create).toHaveBeenCalledWith(diagnostico);
    expect(repository.save).toHaveBeenCalledWith(savedDiagnostico);
  });

  it('debería lanzar BadRequestException si la descripción tiene más de 200 caracteres', async () => {
    const diagnostico: Partial<DiagnosticoEntity> = {
      descripcion: 'a'.repeat(210),
    };

    await expect(service.create(diagnostico)).rejects.toThrow(BadRequestException);
  });
  
  it('debería retornar un diagnóstico por su ID usando findOne', async () => {
    const diagnosticoId = '1';
    const diagnostico: DiagnosticoEntity = {
      id: diagnosticoId,
      descripcion: 'Diagnóstico de prueba',
      nombre: "enfermedad",
      pacientes:[]
    };
  
    jest.spyOn(repository, 'findOne').mockResolvedValue(diagnostico);
  
    const result = await service.findOne(diagnosticoId);
  
    expect(result).toEqual(diagnostico);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: diagnosticoId } });
  });
  
  it('debería retornar todos los diagnósticos usando findAll', async () => {
    const diagnosticos: DiagnosticoEntity[] = [
      { id: '1', descripcion: 'Diagnóstico 1', nombre:"enf", pacientes:[] },
      { id: '2', descripcion: 'Diagnóstico 2', nombre:"enf", pacientes:[]  },
    ];
  
    jest.spyOn(repository, 'find').mockResolvedValue(diagnosticos);
  
    const result = await service.findAll();
  
    expect(result).toEqual(diagnosticos);
    expect(repository.find).toHaveBeenCalled();
  });
  
  it('debería eliminar un diagnóstico usando delete', async () => {
    const diagnosticoId = '1';
    const diagnostico: DiagnosticoEntity = { id: diagnosticoId, descripcion: 'Diagnóstico de prueba', nombre:"enf", pacientes:[]  };
  
    jest.spyOn(service, 'findOne').mockResolvedValue(diagnostico);
    jest.spyOn(repository, 'delete').mockResolvedValue({
      affected: 1,
      raw: [], 
    });
    
  
    await service.delete(diagnosticoId);
  
    expect(service.findOne).toHaveBeenCalledWith(diagnosticoId);
    expect(repository.delete).toHaveBeenCalledWith(diagnosticoId);
  });
  
});
