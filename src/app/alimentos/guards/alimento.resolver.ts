import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {AlimentosService} from "../services/alimentos.service";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Alimento} from "../model/alimento";

@Injectable({
  providedIn: 'root'
})
export class AlimentoResolver {

  constructor( private service: AlimentosService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Alimento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: 0, tipo: '', valor: 0});
  }
}
