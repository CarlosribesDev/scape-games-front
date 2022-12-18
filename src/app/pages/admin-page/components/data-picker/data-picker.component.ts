import { Day } from './../../../../models/Day';
import {  Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { DayService } from 'src/app/service/day.service';


@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent  implements OnInit{

  @Output() selectedDayEvent: EventEmitter<Day> = new EventEmitter();
  @Output() daysInMonthEvent: EventEmitter<Day[]> = new EventEmitter();

  readonly monthNames: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  readonly weekDays: string[] = ['Lun','Mar','Mie','Jue','Vie','Sab','Dom']
  private currentDate = new Date();

  private monthNumber = this.currentDate.getMonth();
  private currentYear = this.currentDate.getFullYear();
  private currentDay = this.currentDate.getDate();
  public selectedDay?: Day;

  month: string = this.monthNames[this.monthNumber];
  year :string = this.currentYear.toString()
  days: (Day| null)[]= []

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
    this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
    this.month = this.monthNames[this.monthNumber];
    this.year = this.currentYear.toString();

    this.writeMonth();
  }

  selectDay(day: Day){
    this.selectedDay = day;
    this.selectedDayEvent.emit(day);

  }

  writeMonth() {
    for(let i = this.startDay(); i > 0 ; i--){
      this.days.push(null);
    }

    this.dayService.findByDate(this.currentYear, this.monthNumber + 1).subscribe({
      next:(daysInMonth: Day[]) => {
        this.days.push(...daysInMonth);
        this.daysInMonthEvent.emit(daysInMonth);
      }
    })
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.monthNumber, 1);
      return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
  }
}
