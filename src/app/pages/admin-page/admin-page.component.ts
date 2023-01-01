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
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {

  schedules : Schedule[] = [];
  selectedSchedule?: Schedule;
  weekDaysSelected: number[] = [];
  focusDay?: Day;
  daysSelected: Day[] = [];

  resetEvent: Subject<void> = new Subject<void>();

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

  setFocusDay(day: Day){
    this.focusDay = day;
  }

  updateCalendar(){
    if(!this.selectedSchedule || this.daysSelected.length === 0){
      return;
    }

    this.daysSelected.forEach(day => {
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

    this.dayService.updateAll(this.daysSelected).subscribe({
      next:(days: Day[])=> {
        this.resetEvent.next();
        Swal.fire({
          text: 'Calendario Actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error:(e)=>{
        Swal.fire({
          text: 'Error al actualizar horario',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

      }
    })
  }
  onUpdateDays(days: Day[]){
    this.daysSelected = days;
  }
  openScheduleModal(){
    this.modalService.open(ScheduleModalComponent ,{size: 'sm'}).hidden.subscribe({
      next:()=>{
        this.getSchedules();
      }
    })
  }

}
