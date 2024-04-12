import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss'
})
export class UsuariosListComponent {
  @Input() usuarios: Usuario[] = []
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'email', 'senha', 'cpf', 'status', 'acoes'];

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(usuario: Usuario) {
    this.edit.emit(usuario);
  }
}
