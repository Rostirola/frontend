import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientePage} from "../model/cliente-page";
import {first} from "rxjs";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  private readonly API = '/Clientes'

  constructor(private httpClient: HttpClient) {
  }

  list(page = 0, size = 10) {
    return this.httpClient.get<ClientePage>(this.API, {params: {page, size}})
      .pipe(
        first(),
        //delay(5000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Cliente>(`${this.API}/${id}`);
  }

  save(record: Partial<Cliente>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Cliente>) {
    return this.httpClient.post<Cliente>(this.API, record).pipe(first());
  }

  private update(record: Partial<Cliente>) {
    return this.httpClient.put<Cliente>(`${this.API}/${record.id}`, record).pipe(first());
  }
}
