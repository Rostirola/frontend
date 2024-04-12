import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {UsuariosService} from "../service/usuarios.service";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver {
  constructor(private service: UsuariosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: 0, nome: '', email: '', senha: '', cpf: '', status: false,});
  }
}
