import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Alimento} from "../../model/alimento";

@Component({
  selector: 'app-alimentos-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './alimentos-list.component.html',
  styleUrl: './alimentos-list.component.scss'
})
export class AlimentosListComponent {

  @Input() alimentos: Alimento[] = []
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'tipo', 'nome', 'valor', 'acoes'];

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(alimento: Alimento) {
    this.edit.emit(alimento);
  }
}
