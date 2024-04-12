import {Component, ViewChild} from '@angular/core';
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
import {PedidoPage} from "../../model/pedido-page";
import {PedidosService} from "../../service/pedidos.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {Pedido} from "../../model/pedido";
import {PedidosListComponent} from "../../components/pedidos-list/pedidos-list.component";

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatFormFieldModule, MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatProgressSpinner, AsyncPipe, PedidosListComponent, MatPaginator
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {

  pedidos$: Observable<PedidoPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private pedidosService: PedidosService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.refresh()
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.pedidos$ = this.pedidosService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(() => {
        this.onError('Erro ao carregar pedidos.');
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

  onEdit(pedido: Pedido) {
    this.router.navigate(['edit', pedido.id], {relativeTo: this.route});
  }
}
