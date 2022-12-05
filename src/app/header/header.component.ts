import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../shared/modals/login-modal/login-modal.component';
import { RegistrationModalComponent } from '../shared/modals/registration-modal/registration-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modalService: NgbModal) { }


  ngOnInit(): void {
  }

  public getUsers(){

    this.userService.getAllUser()
    .subscribe((users: Object) => {

      console.log(users);

    })


  }

  openLoginModal(){
    this.modalService.open(LoginModalComponent);
  }

  openRegistrationModal(){
    this.modalService.open(RegistrationModalComponent);
  }

  public Regis(){

  }
}
