import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerComponent } from './computer/computer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
      path: './',
      loadChildren: () => import('src/app/app.module').then(m => m.AppModule)
    },
    { path: '',component: HomeComponent,
      children: [
        { path: '', component: ComputerComponent, outlet: "mainOutlet"},
        ]
    }
  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
