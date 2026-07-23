import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultipleChoiceQuestion, Question } from '../../models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;

  @Output() answer: EventEmitter<any> = new EventEmitter();

  freeResponseText: string = "";

  followupQuestion?: Question = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFreeResponseEdited() {
    if (this.freeResponseText === "") {
      this.updateAnswer(null);
    } else {
      this.updateAnswer(this.freeResponseText);
    }
  }

  onMultipleChoiceEdited(answer: string) {
    this.updateAnswer(answer);
  }

  onFollowupAnswer(event) {
    this.answer.emit(event);
  }

  updateAnswer(new_answer: any) {
    this.answer.emit({
      id: this.question.id,
      answer: new_answer
    });

    // emit N/A answers for non-selected followup questions
    if (this.question.type == "multiple-choice") {
      for (let o of (this.question.data as MultipleChoiceQuestion).options) {
        // update followup question display
        if (o.text == new_answer) {
          this.followupQuestion = o.followup;
        }
        if (o.followup) {
          if (o.text == new_answer) {
            this.answer.emit({
              id: o.followup.id,
              answer: null
            });
          } else {
            this.answer.emit({
              id: o.followup.id,
              answer: "N/A"
            });
          }
        }
      }
    }
  }

}
