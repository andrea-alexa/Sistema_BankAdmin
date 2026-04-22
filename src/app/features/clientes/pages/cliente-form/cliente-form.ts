import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-cliente-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //formulario
  clienteForm!: FormGroup;

  //edicion
  codigoCliente: number | null = null;
  editando = false;

  //inicializarFormulario
  ngOnInit(): void {
    this.buildForm();
    this.cargarClienteSiEsEdicion();
  }

  //crear una funcion que valide si es una edicion
  cargarClienteSiEsEdicion(): void {
    const codigoParametro = this.route.snapshot.paramMap.get('codigo');

    if (!codigoParametro) return;

    this.codigoCliente = Number(codigoParametro);
    this.editando = true;

    const cliente = this.clienteService.getClientePorCodigo(this.codigoCliente);

    if (!cliente) {
      this.router.navigate(['/clientes']);
      return;
    }

    this.clienteForm.patchValue({
      nombre: cliente.nombre,
      dui: cliente.dui,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion,
      estado: cliente.estado,
    });
  }

  //metodo vacio para construir nuestro grupo de formulario
  buildForm(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dui: ['', [Validators.required, Validators.pattern(/^\d{8}-\d$/)]], //expresiones regulares
      telefono: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(150)]],
      estado: ['Activo', [Validators.required]],
    });
  }

  //metodo vacio para guardar el cliente
  guardar(): void {
    //validar el formulario
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    //crear nuestro objeto
    const cliente = this.clienteForm.value;

    if (this.editando && this.codigoCliente != null) {
      this.clienteService.updateCliente(this.codigoCliente, cliente);
    }
    else {
      this.clienteService.saveCliente(cliente);
    }

    //redirigir al listado de clientes
    this.router.navigate(['/clientes']);
  }

  //getter and setter para los controles del formulario

  get nombre(){
    return this.clienteForm.get('nombre');
  }

  get dui(){
    return this.clienteForm.get('dui');
  }

  get telefono(){
    return this.clienteForm.get('telefono');
  }

  get correo(){
    return this.clienteForm.get('correo');
  }

  get direccion(){
    return this.clienteForm.get('direccion');
  }

  get estado(){
    return this.clienteForm.get('estado');
  }
}
