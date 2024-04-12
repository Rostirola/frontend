import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {UsuarioPage} from "../model/usuario-page";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  private readonly API = '/Usuarios'

  constructor(private httpClient: HttpClient) {
  }

  list(page = 0, size = 10) {
    return this.httpClient.get<UsuarioPage>(this.API, {params: {page, size}})
      .pipe(
        first(),
        //delay(5000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`);
  }

  save(record: Partial<Usuario>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Usuario>) {
    return this.httpClient.post<Usuario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Usuario>) {
    return this.httpClient.put<Usuario>(`${this.API}/${record.id}`, record).pipe(first());
  }
}
