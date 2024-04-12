import {Component, ViewChild} from '@angular/core';
import {ClientesListComponent} from "../../components/clientes-list/clientes-list.component";
import {AsyncPipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {catchError, Observable, of, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {Cliente} from "../../model/cliente";
import {ClientePage} from "../../model/cliente-page";
import {ClientesService} from "../../service/clientes.service";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    MatFormFieldModule, MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatProgressSpinner, AsyncPipe, ClientesListComponent, MatPaginator
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  clientes$: Observable<ClientePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.refresh()
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.clientes$ = this.clientesService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar clientes.');
        return of({content: [], totalElements: 0, totalPages: 0})
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['edit', cliente.id], {relativeTo: this.route});
  }
}
