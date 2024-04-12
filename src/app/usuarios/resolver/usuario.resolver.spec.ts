import {TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {UsuarioResolver} from "./usuario.resolver";
import {UsuariosService} from "../service/usuarios.service";
import {Usuario} from "../model/usuario";

describe('usuarioResolver', () => {
  let resolver: UsuarioResolver;
  let usuarioServiceSpy: jasmine.SpyObj<UsuariosService>;

  beforeEach(() => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuariosService', ['loadById']);
    TestBed.configureTestingModule({
      providers: [{provide: UsuariosService, useValue: usuarioServiceSpy}]
    });
    resolver = TestBed.inject(UsuarioResolver);
  });

  it('should return usuario', () => {
    const usuario = {
      id: 0,
      nome: 'Angular',
      email: "ABCD",
      senha: "ABCD",
      cpf: "ABCD",
      status: false,
    };
    usuarioServiceSpy.loadById.and.returnValue(of(usuario));
    const result = resolver.resolve({params: {id: 1}} as any, {} as any);
    result.subscribe((res: Usuario) => expect(res).toEqual(usuario));
  });

  it('should return empty usuario if new', () => {
    const usuario = {id: 0, nome: '', email: '', senha: '', cpf: '', status: false,};
    usuarioServiceSpy.loadById.and.returnValue(of(usuario));
    const result = resolver.resolve({params: {}} as any, {} as any);
    result.subscribe((res: Usuario) => expect(res).toEqual(usuario));
  });
});
