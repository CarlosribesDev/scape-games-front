import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { RegistrationModalComponent } from "./registration-modal/registration-modal.component";
import { CommonModule } from '@angular/common';
import { ValidatorErrorsComponent } from './validator-erros/validator-errors.component';
import { BasicModalComponent } from './basic-modal/basic-modal.component';

@NgModule({
  declarations: [
    LoginModalComponent,
    RegistrationModalComponent,
    ValidatorErrorsComponent,
    BasicModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
  ]
})
export class ModalsModule { }
