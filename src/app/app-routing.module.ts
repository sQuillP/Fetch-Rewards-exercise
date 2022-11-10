import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessfulCreationComponent } from './successful-creation/successful-creation.component';
import { SuccessfulCreationGuard } from './successful-creation/successful-creation.guard';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path:"create-user", component: UserFormComponent},
  {path: "create-user/success", canActivate: [SuccessfulCreationGuard], component: SuccessfulCreationComponent},
  {path: "**", redirectTo:"/create-user", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
