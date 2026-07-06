import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-posttestquestions',
  templateUrl: './posttestquestions.component.html',
  styleUrls: ['./posttestquestions.component.scss']
})
export class PosttestquestionsComponent implements OnInit {
  @Output() submitClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitClicked(): void {
    this.submitClicked.emit();
  }

}
