import { HttpErrorResponse } from '@angular/common/http';
import { TokenResponse } from './../../../models/TokenReponse';
import { LoginRequest } from './../../../models/LoginRequest';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit {

  loginForm!: FormGroup;
  submit: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService
    ) {

      this.loginForm = fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
      })
    }

  get username(): FormControl  { return this.loginForm.get('username') as FormControl }
  get password(): FormControl  { return this.loginForm.get('password') as FormControl }

  ngOnInit(): void {

  }

  onSubmit(): void {

    this.submit = true;

    if(this.loginForm.status !== 'VALID') return;

    const loginRequest: LoginRequest = {
      username: this.username.value,
      password: this.password.value
    }

    this.authService.authUser(loginRequest).subscribe({
      next: (tokenResp: TokenResponse) => {
        this.authService.logIn(tokenResp.token);
        this.authService.getCurrentUser().subscribe({
          next:(user: User) => {
              console.log(user);
          }
        })

      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error);


      }
    })

  }
}
