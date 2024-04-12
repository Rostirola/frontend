import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Cliente} from "../../model/cliente";

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss'
})
export class ClientesListComponent {
  @Input() clientes: Cliente[] = []
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'cpf', 'status', 'acoes'];

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(cliente: Cliente) {
    this.edit.emit(cliente);
  }
}
