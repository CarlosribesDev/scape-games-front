import { UserService } from './../service/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public getUsers(){

    this.userService.getAllUser()
    .subscribe((users: Object) => {

      console.log(users);

    })


  }
}
