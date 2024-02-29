import {Component, ViewChild} from '@angular/core';
import {Alimento} from "../../model/alimento";
import {AlimentosService} from "../../services/alimentos.service";
import {catchError, Observable, of, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {AlimentoPage} from "../../model/alimento-page";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe} from "@angular/common";
import {AlimentosListComponent} from "../../components/alimentos-list/alimentos-list.component";

@Component({
  selector: 'app-alimentos',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatProgressSpinner, AsyncPipe, AlimentosListComponent, MatPaginator],
  templateUrl: './alimentos.component.html',
  styleUrl: './alimentos.component.scss'
})
export class AlimentosComponent {

  alimentos$: Observable<AlimentoPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private alimentosService: AlimentosService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh()
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.alimentos$ = this.alimentosService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar alimentos.');
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

  onEdit(alimento: Alimento) {
    this.router.navigate(['edit', alimento.id], {relativeTo: this.route});
  }

  onRemove(alimento: Alimento) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse alimento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.alimentosService.remove(alimento.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Alimento removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover alimento.')
        );
      }
    });
  }
}
