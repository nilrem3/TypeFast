import { Injectable, inject } from '@angular/core';
import { MultipleChoiceQuestion, Question } from '../app/models/Question'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  httpClient = inject(HttpClient);
  pretest_questions?: Question[]
  pretest_question_answers: Map<string, string | null> = new Map();
  posttest_questions?: Question[]
  posttest_question_answers: Map<string, string | null> = new Map();

  constructor() {
    this.httpClient.get('assets/pretest_questions.json', { responseType: 'json' }).subscribe(data => {
      this.pretest_questions = data as Question[];
      for (let q of this.pretest_questions.values()) {
        this.registerPretestQuestion(q);
      }
    });
    this.httpClient.get('assets/posttest_questions.json', { responseType: 'json' }).subscribe(data => {
      this.posttest_questions = data as Question[];
      for (let q of this.posttest_questions.values()) {
        this.registerPosttestQuestion(q);
      }
    });
  }

  registerPretestQuestion(q: Question) {
    this.pretest_question_answers[q.id] = null;
    if (q.type === "multiple-choice") {
      for (let o of (q.data as MultipleChoiceQuestion).options) {
        if (o.followup) {
          this.registerPretestQuestion(o.followup);
        }
      }
    }
  }

  registerPosttestQuestion(q: Question) {
    this.posttest_question_answers[q.id] = null;
    if (q.type === "multiple-choice") {
      for (let o of (q.data as MultipleChoiceQuestion).options) {
        if (o.followup) {
          this.registerPosttestQuestion(o.followup);
        }
      }
    }
  }
}
