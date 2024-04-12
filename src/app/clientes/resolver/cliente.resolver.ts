import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ClientesService} from "../service/clientes.service";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver {
  constructor(private service: ClientesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: 0, nome: '', cpf: "", status: false});
  }
}
