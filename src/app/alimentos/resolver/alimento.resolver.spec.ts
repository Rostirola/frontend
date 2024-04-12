import {TestBed} from '@angular/core/testing';

import {AlimentoResolver} from './alimento.resolver';
import {AlimentosService} from "../services/alimentos.service";
import {of} from "rxjs";
import {Alimento} from "../model/alimento";

describe('AlimentoResolver', () => {
  let resolver: AlimentoResolver;
  let alimentoServiceSpy: jasmine.SpyObj<AlimentosService>;

  beforeEach(() => {
    alimentoServiceSpy = jasmine.createSpyObj('AlimentosService', ['loadById']);
    TestBed.configureTestingModule({
      providers: [{provide: AlimentosService, useValue: alimentoServiceSpy}]
    });
    resolver = TestBed.inject(AlimentoResolver);
  });

  it('should return alimento', () => {
    const alimento = {
      id: 0,
      tipo: 'Angular',
      nome: "teste",
      valor: 0
    };
    alimentoServiceSpy.loadById.and.returnValue(of(alimento));
    const result = resolver.resolve({params: {id: 1}} as any, {} as any);
    result.subscribe((res: Alimento) => expect(res).toEqual(alimento));
  });

  it('should return empty alimento if new', () => {
    const alimento = {id: 0, tipo: '', nome: '', valor: 0};
    alimentoServiceSpy.loadById.and.returnValue(of(alimento));
    const result = resolver.resolve({params: {}} as any, {} as any);
    result.subscribe((res: Alimento) => expect(res).toEqual(alimento));
  });
});
