import { UserService } from './../../service/user.service';
import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  role: string = '';
  bookings: Booking[] = [];
  user: User | null = null

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {

    this.role = this.authService.getUserRole();
    this.bookings = []

    if(this.role === 'ROLE_ADMIN'){
        this.userService.getAllUser().subscribe({
          next:(users: User[])=>{
            console.log(users);

              users.forEach(user => {
                this.bookings = this.bookings.concat(user.bookings);
                console.log(this.bookings);

              })

              this.bookings.forEach(booking => {
                this.translateBooking(booking)

              })

            this.bookings.forEach(booking => {
              this.addUserName(booking);
            })
          }
        })




    }
    else if(this.role === 'ROLE_USER'){
        const userBookings: Booking[] | undefined = this.authService.getUser()?.bookings;
        if(userBookings === undefined){
          return;
        }
        this.user = this.authService.getUser();
        this.bookings = userBookings;

        this.bookings.forEach(booking => {
          this.translateBooking(booking)
        }
      )
    }
  }

  translateBooking(booking: Booking){
    if(!booking.game){
      return;
    }

    let name = booking.game.name;
    if(name === "THE_DEN") booking.game.name = 'La guarida';
    if(name === "HAUNTED_HOUSE") booking.game.name = 'La casa encantada';
  }

  getImageSrc(booking: Booking): string{

    if(!booking.game){
      return '../../../../assets/image.jpg';
    }

    switch(booking.game.name){
      case  "La guarida": return'../../../../assets/the-den.jpg';
      case "La casa encantada" : return '../../../../assets/haunted-house.jpg'; break;
      default : return '../../../../assets/image.jpg'
    }
  }

  async addUserName(booking: Booking) {

    const userId = booking.userId;
    if(!userId){
      return;
    }

    this.userService.getUserById(userId).subscribe({
      next:(user: User)=> {
        booking.userFullName = `${user.name} ${user.surname}`
      }
    })
  }

}

