import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit {

  constructor(public modalRef: NgbActiveModal) { }

  ngOnInit(): void {

  }
}
