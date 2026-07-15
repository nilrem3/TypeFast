import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-posttestquestions',
  templateUrl: './posttestquestions.component.html',
  styleUrls: ['./posttestquestions.component.scss']
})
export class PosttestquestionsComponent implements OnInit {
  @Output() submitClicked = new EventEmitter();

  questionsService: QuestionsService;

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  ngOnInit(): void {
  }

  onSubmitClicked(): void {
    this.submitClicked.emit();
  }

}
