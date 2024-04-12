import {Injectable} from '@angular/core';
import {Alimento} from "../model/alimento";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {AlimentoPage} from "../model/alimento-page";

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  private readonly API = '/Alimentos'

  constructor(private httpClient: HttpClient) {
  }

  list(page = 0, size = 10) {
    return this.httpClient.get<AlimentoPage>(this.API, {params: {page, size}})
      .pipe(
        first(),
        //delay(5000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Alimento>(`${this.API}/${id}`);
  }

  save(record: Partial<Alimento>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Alimento>) {
    return this.httpClient.post<Alimento>(this.API, record).pipe(first());
  }

  private update(record: Partial<Alimento>) {
    return this.httpClient.put<Alimento>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
