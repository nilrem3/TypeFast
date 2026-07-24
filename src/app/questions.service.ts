import { Injectable, inject } from '@angular/core';
import { MultipleChoiceQuestion, Question, NO_ANSWER} from '../app/models/Question'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  httpClient = inject(HttpClient);
  pretest_questions?: Question[]
  pretest_question_answers: Map<string, string | NO_ANSWER> = new Map();
  posttest_questions?: Question[]
  posttest_question_answers: Map<string, string | NO_ANSWER> = new Map();

  constructor() {
    this.httpClient.get('assets/pretest_questions.json', { responseType: 'json' }).subscribe(data => {
      this.pretest_questions = data as Question[];
      for (let q of this.pretest_questions) {
        this.registerPretestQuestion(q);
      }
    });
    this.httpClient.get('assets/posttest_questions.json', { responseType: 'json' }).subscribe(data => {
      this.posttest_questions = data as Question[];
      for (let q of this.posttest_questions) {
        this.registerPosttestQuestion(q);
      }
    });
  }

  registerPretestQuestion(q: Question) {
    console.log(`Registering pretestquestion ${q.id}`);
    this.pretest_question_answers.set(q.id, NO_ANSWER);
    if (q.type === "multiple-choice") {
      for (let o of (q.data as MultipleChoiceQuestion).options) {
        if (o.followup) {
          this.registerPretestQuestion(o.followup);
        }
      }
    }
  }

  registerPosttestQuestion(q: Question) {
    this.posttest_question_answers.set(q.id, NO_ANSWER);
    if (q.type === "multiple-choice") {
      for (let o of (q.data as MultipleChoiceQuestion).options) {
        if (o.followup) {
          this.registerPosttestQuestion(o.followup);
        }
      }
    }
  }

  pretestQuestionsAllAnswered(): boolean {
    console.log("checking if all pretest questions are answered...");
    let ret = true;
    this.pretest_question_answers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
      if (value === NO_ANSWER) {
        ret = false;
      }
    });
    return ret;
  }

  posttestQuestionsAllAnswered(): boolean {
    let ret = true;
    this.posttest_question_answers.forEach((value, key) => {
      if (value === NO_ANSWER) {
        ret = false;
      }
    });
    return ret;
  }
}
