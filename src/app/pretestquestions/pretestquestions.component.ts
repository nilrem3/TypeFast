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

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  ngOnInit(): void {
  }

  onBeginClicked(): void {
    this.beginClicked.emit()
  }

  onQuestionAnswered(event: any) {
    this.questionsService.pretest_question_answers[event.id] = event.answer;
    console.log(event);
  }

}
