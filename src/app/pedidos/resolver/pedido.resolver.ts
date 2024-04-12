import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {PedidosService} from "../service/pedidos.service";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoResolver {
  constructor(private service: PedidosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pedido> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: 0, usuario: 0, cliente: 0, dataHora: "", valorTotal: 0, itens: []});
  }
}
