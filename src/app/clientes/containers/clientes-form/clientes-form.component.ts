import {Component} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {Cliente} from "../../model/cliente";
import {ClientesService} from "../../service/clientes.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-clientes-form',
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
      MatInputModule,
      MatCardModule, MatRadioModule, FormsModule, MatCheckboxModule, MatSlideToggleModule
    ],
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.scss'
})
export class ClientesFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const cliente: Cliente = this.route.snapshot.data['cliente'];
    this.form = this.formBuilder.group({
      id: [cliente.id],
      nome: [cliente.nome, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      cpf: [cliente.cpf, [Validators.required]],
      status: [cliente.status, [Validators.required]]
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess('Cliente salvo com sucesso!'), error => this.onError('Erro ao salvar clientel.'));
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
