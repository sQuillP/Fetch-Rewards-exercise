import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SuccessfulCreationComponent } from './successful-creation/successful-creation.component';
import {HttpClientModule} from "@angular/common/http"
import { SuccessfulCreationGuard } from './successful-creation/successful-creation.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    SuccessfulCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SuccessfulCreationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
