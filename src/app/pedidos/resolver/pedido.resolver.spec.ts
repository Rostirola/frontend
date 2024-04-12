import {TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {PedidosService} from "../service/pedidos.service";
import {PedidoResolver} from "./pedido.resolver";
import {Pedido} from "../model/pedido";

describe('pedidoResolver', () => {
  let resolver: PedidoResolver;
  let pedidoServiceSpy: jasmine.SpyObj<PedidosService>;

  beforeEach(() => {
    pedidoServiceSpy = jasmine.createSpyObj('PedidosService', ['loadById']);
    TestBed.configureTestingModule({
      providers: [{provide: PedidosService, useValue: pedidoServiceSpy}]
    });
    resolver = TestBed.inject(PedidoResolver);
  });

  it('should return pedido', () => {
    const pedido = {
      id: 0,
      usuario: 0,
      cliente: 0,
      dataHora: "",
      valorTotal: 0,
      itens: []
    };
    pedidoServiceSpy.loadById.and.returnValue(of(pedido));
    const result = resolver.resolve({params: {id: 1}} as any, {} as any);
    result.subscribe((res: Pedido) => expect(res).toEqual(pedido));
  });

  it('should return empty pedido if new', () => {
    const pedido = {id: 0, usuario: 0, cliente: 0, dataHora: "", valorTotal: 0, itens: []};
    pedidoServiceSpy.loadById.and.returnValue(of(pedido));
    const result = resolver.resolve({params: {}} as any, {} as any);
    result.subscribe((res: Pedido) => expect(res).toEqual(pedido));
  });
});
