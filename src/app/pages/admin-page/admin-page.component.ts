import { ScheduleService } from 'src/app/service/schedule.service';
import { Schedule } from 'src/app/models/Schedule';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ScheduleModalComponent } from 'src/app/shared/modals/schedule-modal/schedule-modal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {

  schedules : Schedule[] = [];

  constructor(
    private authService:AuthService,
    private modalService: NgbModal,
    private scheduleService:ScheduleService,
    private cdr: ChangeDetectorRef) {


     }

  ngOnInit(): void {
    this.scheduleService.findAll().subscribe({
      next:(resp: Schedule[])=> {
        this.schedules = resp;
        this.cdr.detectChanges();
      }
    })
  }

  openScheduleModal(){
    this.modalService.open(ScheduleModalComponent ,{size: 'sm'});
  }

}
