import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import { ClientesList } from './features/clientes/pages/clientes-list/clientes-list';
import { TipoCuentaList } from './features/tipo-cuenta/pages/tipo-cuenta-list/tipo-cuenta-list';
import { CuentasList } from './features/cuentas/pages/cuentas-list/cuentas-list';
import { ClienteForm } from './features/clientes/pages/cliente-form/cliente-form';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'clientes',
        component: ClientesList
    },
    {
        path: 'clientes/nuevo',
        component: ClienteForm
    },
    {
        path: 'clientes/editar/:codigo',
        component: ClienteForm
    },
    {
        path: 'tipo-cuenta',
        component: TipoCuentaList
    },
    {
        path: 'cuentas', 
        component: CuentasList
    }
];
