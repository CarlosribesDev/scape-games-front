import { User } from 'src/app/models/User';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';


@Component({

  templateUrl: './registration-modal.component.html',
})
export class RegistrationModalComponent implements OnInit {

  userForm: FormGroup;
  errorMessage: string = '';

  constructor(public modalRef: NgbActiveModal,fb: FormBuilder) {

    this.userForm = fb.group({
      name : ['',[Validators.required, Validators.minLength(3)]],
      surname: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]],
      passwordRepeated: ['',[Validators.required, Validators.minLength(3)]],
      telephone: ['',[Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      email: ['',[Validators.required, Validators.email]],
    })
  }

  get name(): FormControl { return this.userForm.get('name') as FormControl }
  get surname(): FormControl  { return this.userForm.get('surname') as FormControl }
  get password(): FormControl  { return this.userForm.get('password') as FormControl }
  get passwordRepeated(): FormControl { return this.userForm.get('passwordRepeated') as FormControl }
  get telephone(): FormControl { return this.userForm.get('telephone') as FormControl }
  get email(): FormControl  { return this.userForm.get('email') as FormControl }

  ngOnInit(): void {


  }

  validatePassword(): boolean {
    return this.password === this.passwordRepeated;
    //dirty touch
  }

  onSubmit(): void {



    // console.log(this.userForm.value);
    // console.log(this.userForm.status);
    if(this.userForm.status === 'INVALID'){
      this.buildErrorMeesage;
      return;
    }

    console.log(this.name);






  }

  private buildErrorMeesage(): void {
    this.errorMessage = 'error'
  }
}
