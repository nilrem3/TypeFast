import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pretestquestions',
  templateUrl: './pretestquestions.component.html',
  styleUrls: ['./pretestquestions.component.scss']
})
export class PretestquestionsComponent implements OnInit {
  @Output() beginClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onBeginClicked(): void {
    this.beginClicked.emit()
  }

}
