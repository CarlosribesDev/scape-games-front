import { Day } from './../../../../models/Day';
import {  Component,  OnInit } from '@angular/core';


@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent  implements OnInit{

  readonly monthNames: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  readonly weekDays: string[] = ['Lun','Mar','Mie','Jue','Vie','Sab','Dom']
  private currentDate = new Date();

  private monthNumber = this.currentDate.getMonth();
  private currentYear = this.currentDate.getFullYear();
  private currentDay = this.currentDate.getDate();

  month: string = this.monthNames[this.monthNumber];
  year :string = this.currentYear.toString()
  days: (Day| null)[]= []

  constructor() {
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

  numberClick(){
    console.log("aaaaaaa");

  }

  writeMonth() {
    for(let i = this.startDay(); i > 0 ; i--){
      this.days.push(null);
    }

    const totalDays = new Date(this.currentYear, this.monthNumber,0).getDate();

    for(let i = 1; i<= totalDays ; i++){
      const newDay: Day = {
        date: new Date(this.currentYear, this.monthNumber, i),
        schedule: null,
        isHoliday: false,
        bookings: []

      }

      this.days.push(newDay);
    }
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.monthNumber, 1);
      return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
  }
}
