import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import { ClientesList } from './features/clientes/pages/clientes-list/clientes-list';
import { TipoCuentaList } from './features/tipo-cuenta/pages/tipo-cuenta-list/tipo-cuenta-list';
import { CuentasList } from './features/cuentas/pages/cuentas-list/cuentas-list';

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
        path: 'tipo-cuenta',
        component: TipoCuentaList
    },
    {
        path: 'cuentas', 
        component: CuentasList
    }
];
