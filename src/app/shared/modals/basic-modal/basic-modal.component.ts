import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
})
export class BasicModalComponent implements OnInit {

  @Input() text: string = '';

  constructor(public modalRef: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
