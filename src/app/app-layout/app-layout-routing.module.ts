import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ChannelsComponent } from './channels/channels.component';
import { ProductsComponent } from './products/products.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {  path: '', redirectTo: 'layout', pathMatch: 'full'},
  { path: 'layout', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path:'', redirectTo:'home', pathMatch:'full'
      },
      {path:'home', loadComponent: () =>
        import('./home/home.component').then(m => m.HomeComponent)
      },
      {path:'services', loadComponent: () =>
        import('./services/services.component').then(m => m.ServicesComponent)
      },
      {path:'channels', loadComponent: () => 
        import('./channels/channels.component').then(m => m.ChannelsComponent)
      },
      {path:'products', loadComponent: () => 
        import('./products/products.component').then(m => m.ProductsComponent)
      },
      {path:'accounts', loadComponent: () => 
        import('./accounts/accounts.component').then(m => m.AccountsComponent)
      },
      {path:'categories', loadComponent: () => 
        import('./categories/categories.component').then(m => m.CategoriesComponent)
      },
      {path:'institutions', loadComponent: () => 
        import('./institutions/institutions.component').then(m => m.InstitutionsComponent)
      }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
