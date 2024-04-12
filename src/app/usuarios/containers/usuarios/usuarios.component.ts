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
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {UsuarioPage} from "../../model/usuario-page";
import {UsuariosService} from "../../service/usuarios.service";
import {Usuario} from "../../model/usuario";
import {UsuariosListComponent} from "../../components/usuarios-list/usuarios-list.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatFormFieldModule, MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatProgressSpinner, AsyncPipe, MatPaginator, UsuariosListComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios$: Observable<UsuarioPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.refresh()
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.usuarios$ = this.usuariosService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar usuarios.');
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

  onEdit(usuario: Usuario) {
    this.router.navigate(['edit', usuario.id], {relativeTo: this.route});
  }
}
