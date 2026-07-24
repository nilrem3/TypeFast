import { Component, OnInit, Output, EventEmitter, inject} from '@angular/core';
import { DatacollectorService } from '../datacollector.service';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-pretestquestions',
  templateUrl: './pretestquestions.component.html',
  styleUrls: ['./pretestquestions.component.scss']
})
export class PretestquestionsComponent implements OnInit {
  @Output() beginClicked = new EventEmitter<boolean>();

  questionsService: QuestionsService;
  datacollectorService: DatacollectorService;
  errorMessage: string = "";

  constructor(questionsService: QuestionsService, datacollectorService: DatacollectorService) {
    this.questionsService = questionsService;
    this.datacollectorService = datacollectorService;
  }

  ngOnInit(): void {
  }

  onBeginClicked(): void {
    if (this.questionsService.pretestQuestionsAllAnswered()) {
      // typecast is safe because we know all questions are answered by now
      this.datacollectorService.setPretestQuestionData(this.questionsService.pretest_question_answers as Map<string, string>);
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
