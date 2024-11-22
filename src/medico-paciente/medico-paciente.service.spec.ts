import { Test, TestingModule } from '@nestjs/testing';
import { MedicoPacienteService } from './medico-paciente.service';

describe('MedicoPacienteService', () => {
  let service: MedicoPacienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicoPacienteService],
    }).compile();

    service = module.get<MedicoPacienteService>(MedicoPacienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
