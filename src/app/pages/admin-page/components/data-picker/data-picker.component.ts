import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css','./data-picker.component.scss']
})
export class DataPickerComponent  implements OnInit,AfterViewInit{

  monthNames: string [] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
  currentDate = new Date();
  @ViewChild("dates") datesElement:ElementRef<HTMLDivElement> = {} as ElementRef;
  @ViewChild("month") monthElement:ElementRef<HTMLDivElement> = {} as ElementRef;
  @ViewChild("year") yearElement:ElementRef<HTMLDivElement> = {} as ElementRef;
  monthNumber = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  currentDay = this.currentDate.getDate();
  constructor() {

  }

  ngAfterViewInit() {
    this.writeMonth(this.monthNumber);
    this.monthElement.nativeElement.textContent = this.monthNames[this.monthNumber];
    this.yearElement.nativeElement.textContent  = this.currentYear.toString()
  }

  ngOnInit(): void {

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
    this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
    this.monthElement.nativeElement.textContent = this.monthNames[this.monthNumber];
    this.yearElement.nativeElement.textContent = this.currentYear.toString();
    this.datesElement.nativeElement.textContent = '';
    this.writeMonth(this.monthNumber);
  }

  numberclick(){
    console.log("aaaaaaa");

  }

  writeMonth(month:any) {

    for(let i = this.startDay(); i>0;i--){
      this.datesElement.nativeElement.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
            ${this.getTotalDays(this.monthNumber-1)-(i-1)}
        </div>`;
    }

    for(let i=1; i<=this.getTotalDays(month); i++){
      if(i===this.currentDay) {
        this.datesElement.nativeElement.innerHTML += ` <div (click)="numberclick()" class="calendar__date calendar__item calendar__today" >${i}</div>`;
      }else{
        this.datesElement.nativeElement.innerHTML += ` <div (click)="numberclick()" class="calendar__date calendar__item">${i}</div>`;
      }
    }
  }


  getTotalDays(month:any) {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return this.isLeap() ? 29:28;
    }
  }

  isLeap (): boolean {
    return ((this.currentYear % 100 !==0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0));
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.monthNumber, 1);
      return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
  }
}
































