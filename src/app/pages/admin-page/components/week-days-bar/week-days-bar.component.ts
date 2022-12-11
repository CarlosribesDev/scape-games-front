import { WeekDay } from './../../../../models/WeekDay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-days-bar',
  templateUrl: './week-days-bar.component.html',
  styleUrls: ['./week-days-bar.component.css']
})
export class WeekDaysBarComponent implements OnInit {

  days: WeekDay[] = [
    {
      name:'Lunes',
      selected: false,
    },
    {
      name:'Martes',
      selected: false,
    },
    {
      name:'Miercoles',
      selected: false,
    },
    {
      name:'Jueves',
      selected: false,
    },
    {
      name:'Viernes',
      selected: false,
    },
    {
      name:'Sábado',
      selected: false,
    },
    {
      name:'Domingo',
      selected: false,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(day: WeekDay){
    day.selected = !day.selected;
    console.log(day);

  }
}


