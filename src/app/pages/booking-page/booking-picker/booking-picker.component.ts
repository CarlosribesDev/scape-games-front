import { Day } from 'src/app/models/Day';

import {  Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { DayService } from 'src/app/service/day.service';

interface WeekDayy {
  text: string,
  value: number
}

@Component({
  selector: 'app-booking-picker',
  templateUrl: './booking-picker.component.html',
  styleUrls: ['./booking-picker.component.css']
})
export class BookingPickerComponent  implements OnInit{

  @Output() selectedDayEvent: EventEmitter<Day> = new EventEmitter();


  readonly monthNames: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  readonly weekDays: WeekDayy[] = [
    {
      text:'Lu',
      value:1
    },
    {
      text:'Ma',
      value:2
    },
    {
      text:'Mi',
      value:3
    },
    {
      text:'Ju',
      value:4
    },
    {
      text:'Vi',
      value:5
    },
    {
      text:'Sa',
      value:6
    },
    {
      text:'Do',
      value:0
    },
  ]
  private currentDate = new Date();

  private monthNumber: number = this.currentDate.getMonth();
  private currentYear: number = this.currentDate.getFullYear();
  private currentDay: number = this.currentDate.getDate();
  selectedDay: Day | undefined;

  month: string = this.monthNames[this.monthNumber];
  year :string = this.currentYear.toString()
  days: Day[]= []
  prevDays: null[] = []

  constructor(private dayService: DayService) {

  }

  ngOnInit(): void {
    this.writeMonth();
  }

  lastMonth(): void {
    if(this.monthNumber !== 0){
      this.monthNumber--;
    }else{
      this.monthNumber = 11;
      this.currentYear--;
    }
    this.setNewDate();
  }

  nextMonth(): void {
    if(this.monthNumber !== 11){
        this.monthNumber++;
    }else{
      this.monthNumber = 0;
      this.currentYear++;
    }
    this.setNewDate();
  }

  setNewDate(): void {
    this.days = []
    this.prevDays = []
    this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
    this.month = this.monthNames[this.monthNumber];
    this.year = this.currentYear.toString();

    this.writeMonth();
  }

  selectDay(day: Day){
    this.selectedDay = day

    this.selectedDayEvent.emit(day);
  }



  writeMonth() {
    for(let i = this.startDay(); i > 0 ; i--){
      this.prevDays.push(null);
    }

    this.dayService.findByDate(this.currentYear, this.monthNumber + 1).subscribe({
      next:(daysInMonth: Day[]) => {
        this.days.push(...daysInMonth);
      }
    })
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.monthNumber, 1);
      return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
  }

  onCurrentMonth(): boolean{
      return new Date().getMonth() === this.monthNumber;
  }

  onThreeMonthAftherCurrent(): boolean {
    let value:number = new Date().getMonth();

    for (let index = 1; index <= 3; index++) {
      value !== 11 ? value ++ : value = 0;
    }
    return (this.monthNumber) === value;
  }
}
