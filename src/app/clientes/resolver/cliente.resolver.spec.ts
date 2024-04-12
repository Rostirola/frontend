import {TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {ClientesService} from "../service/clientes.service";
import {Cliente} from "../model/cliente";
import {ClienteResolver} from "./cliente.resolver";

describe('ClienteResolver', () => {
  let resolver: ClienteResolver;
  let clienteServiceSpy: jasmine.SpyObj<ClientesService>;

  beforeEach(() => {
    clienteServiceSpy = jasmine.createSpyObj('ClientesService', ['loadById']);
    TestBed.configureTestingModule({
      providers: [{ provide: ClientesService, useValue: clienteServiceSpy }]
    });
    resolver = TestBed.inject(ClienteResolver);
  });

  it('should return cliente', () => {
    const cliente = {
      id: 0,
      nome: 'Angular',
      cpf: "ABCD",
      status: false
    };
    clienteServiceSpy.loadById.and.returnValue(of(cliente));
    const result = resolver.resolve({ params: { id: 1 } } as any, {} as any);
    result.subscribe((res: Cliente) => expect(res).toEqual(cliente));
  });

  it('should return empty cliente if new', () => {
    const cliente = {id: 0, nome: '', cpf: '', status: false };
    clienteServiceSpy.loadById.and.returnValue(of(cliente));
    const result = resolver.resolve({ params: {} } as any, {} as any);
    result.subscribe((res: Cliente) => expect(res).toEqual(cliente));
  });
});
