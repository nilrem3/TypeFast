import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-handoffprompt',
  templateUrl: './handoffprompt.component.html',
  styleUrls: ['./handoffprompt.component.scss']
})
export class HandoffpromptComponent implements OnInit {

  @Output() nextClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNextClicked(): void {
    this.nextClicked.emit();
  }

}
