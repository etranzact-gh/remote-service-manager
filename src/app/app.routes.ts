import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', redirectTo: 'auth', pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'app-layout',
        loadChildren:() => import('./app-layout/app-layout.module').then(m => m.AppLayoutModule)
    }
];
