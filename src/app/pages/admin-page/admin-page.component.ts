import { Booking } from './../../models/Booking';
import { DayService } from './../../service/day.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { Schedule } from 'src/app/models/Schedule';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ScheduleModalComponent } from 'src/app/shared/modals/schedule-modal/schedule-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { Day } from 'src/app/models/Day';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {

  schedules : Schedule[] = [];
  selectedSchedule?: Schedule;
  weekDaysSelected: number[] = [];
  daySelected?: Day;
  daysInMonth: Day[] = [];

  constructor(
    private authService:AuthService,
    private modalService: NgbModal,
    private scheduleService:ScheduleService,
    private dayService: DayService,
    private cdr: ChangeDetectorRef) {


     }

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules(): void{
    this.scheduleService.findAll().subscribe({
      next:(resp: Schedule[])=> {
        this.schedules = resp;
        this.cdr.detectChanges();
      }
    })
  }

  selectSchedule(schedule: Schedule): void{
    this.selectedSchedule = schedule;
  }

  deleteSchedule(){
    if(!this.selectedSchedule || !this.selectedSchedule.id){
      return;
    }

    this.scheduleService.delete(this.selectedSchedule.id).subscribe({
      next:()=>{
        this.getSchedules();
        this.selectedSchedule = undefined;

      }
    })
  }

  updateWeekDaysSelected(daysList: number[]){
    this.weekDaysSelected = daysList;
  }

  updateDaysInMonth(days: Day[]){
    this.daysInMonth = days;
    console.log(this.daysInMonth );

  }

  updateCalendar(){
    if(!this.selectedSchedule || this.weekDaysSelected.length === 0){
      return
    }


    const daysToUpdate: Day[] = this.daysInMonth.filter(day => this.weekDaysSelected.includes(new Date(day.date).getDay()))


    daysToUpdate.forEach(day => {
      const bookings: Booking[] = this.selectedSchedule!.hours.map(hour => {
        return {
          id:null,
          hour:hour,
          day_id:day.id,
          isBusy:false,
          user_id:null
        }
      })

      day.bookings = bookings;
    })

    this.dayService.updateAll(daysToUpdate).subscribe({
      next:(days: Day[])=>{
        console.log(days);

      },
      error:(e)=>{
        console.log(e);

      }
    })
  }
  onClickDay(day: Day){
    console.log(day.date);
    this.daySelected = day;

  }
  openScheduleModal(){
    this.modalService.open(ScheduleModalComponent ,{size: 'sm'}).hidden.subscribe({
      next:()=>{
        this.getSchedules();
      }
    })
  }

}
