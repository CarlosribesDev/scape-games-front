import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { RegistrationModalComponent } from "./registration-modal/registration-modal.component";
import { CommonModule } from '@angular/common';
import { ValidatorErrorsComponent } from './validator-erros/validator-errors.component';

@NgModule({
  declarations: [
    LoginModalComponent,
    RegistrationModalComponent,
    ValidatorErrorsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    LoginModalComponent,
    RegistrationModalComponent
  ]
})
export class ModalsModule { }
