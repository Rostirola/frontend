import {Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {UsuariosService} from "../../service/usuarios.service";
import {Usuario} from "../../model/usuario";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOption,
    MatCardContent,
    MatToolbar,
    MatCard,
    MatFormField,
    MatSelect,
    MatCardActions,
    MatButton,
    MatInput,
    MatInputModule
  ],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.scss'
})
export class UsuariosFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsuariosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const usuario: Usuario = this.route.snapshot.data['usuario'];
    this.form = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      email: [usuario.email, [Validators.required]],
      senha: [usuario.senha, [Validators.required]],
      cpf: [usuario.cpf, [Validators.required]],
      status: [usuario.status, [Validators.required]],
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess('Usuario salvo com sucesso!'), error => this.onError('Erro ao salvar usuariol.'));
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(mensagem: string) {
    this.snackBar.open(mensagem, '', {duration: 5000});
    this.onCancel();
  }

  private onError(mensagem: string) {
    this.snackBar.open(mensagem, '', {duration: 5000});
  }
}
