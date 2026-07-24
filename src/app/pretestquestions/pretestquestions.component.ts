import { Component, OnInit, Output, EventEmitter, inject} from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-pretestquestions',
  templateUrl: './pretestquestions.component.html',
  styleUrls: ['./pretestquestions.component.scss']
})
export class PretestquestionsComponent implements OnInit {
  @Output() beginClicked = new EventEmitter<boolean>();

  questionsService: QuestionsService;
  errorMessage: string = "";

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  ngOnInit(): void {
  }

  onBeginClicked(): void {
    if (this.questionsService.pretestQuestionsAllAnswered()) {
      this.beginClicked.emit()
    } else {
      this.errorMessage = "Please answer all of the questions.";
    }
  }

  onQuestionAnswered(event: any) {
    this.questionsService.pretest_question_answers.set(event.id, event.answer);
    this.errorMessage = "";
  }

}
