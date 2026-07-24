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
  errorMessage: string;

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  ngOnInit(): void {
  }

  onSubmitClicked(): void {
    if (this.questionsService.posttestQuestionsAllAnswered()) {
      this.submitClicked.emit()
    } else {
      this.errorMessage = "Please answer all of the questions.";
    }
  }

  onQuestionAnswered(event: any) {
    this.questionsService.posttest_question_answers.set(event.id, event.answer);
    this.errorMessage = "";
  }

}
