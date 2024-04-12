import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {PedidoPage} from "../model/pedido-page";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {


  private readonly API = '/Pedidos'

  constructor(private httpClient: HttpClient) {
  }

  list(page = 0, size = 10) {
    return this.httpClient.get<PedidoPage>(this.API, {params: {page, size}})
      .pipe(
        first(),
        //delay(5000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Pedido>(`${this.API}/${id}`);
  }

  save(record: Partial<Pedido>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Pedido>) {
    return this.httpClient.post<Pedido>(this.API, record).pipe(first());
  }

  private update(record: Partial<Pedido>) {
    return this.httpClient.put<Pedido>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
