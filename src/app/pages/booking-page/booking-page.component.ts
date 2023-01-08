import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { GameService } from './../../service/game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Day } from 'src/app/models/Day';
import { Game } from 'src/app/models/Game';
import { flip } from '@popperjs/core';
import { BookingModalComponent } from 'src/app/shared/modals/booking-modal/booking-modal.component';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit,OnDestroy {


  private sub: any;
  selectedDay: Day | null = null;
  game?: Game;
  bgClass: String = '';
  isLooged: boolean = false;
  updateCalendar: Subject<void> = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private gameService:GameService,
    public authService: AuthService,
    private modalService: NgbModal) {

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id: number = params['id'];

      this.gameService.getById(id).subscribe({
        next:(game: Game)=>{
          this.game = game;
          switch(this.game.name){
            case "La guarida": this.bgClass = 'bg-the-den-image'; break;
            case "La casa encantada" : this.bgClass = 'bg-hounted-house-image'; break;
            default : this.bgClass = ''
          }

        }
      })

    });

  }

  selectDay(day: Day){
    this.selectedDay = day;
  }

  openConfirmModal(booking: Booking){

    booking.game = this.game;

    const modalRef = this.modalService.open(BookingModalComponent,{size: 'sm'});


    modalRef.componentInstance.booking = booking;
    modalRef.closed.subscribe({
      next:()=>{
          this.updateCalendar.next();
          console.log("actuliazado");

        }
    })
  }
}
