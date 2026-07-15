import { Injectable, inject } from '@angular/core';
import { Question } from '../app/models/Question'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  httpClient = inject(HttpClient);
  pretest_questions?: Question[]

  constructor() {
    this.httpClient.get('assets/pretest_questions.json', { responseType: 'json' }).subscribe(data => {
      this.pretest_questions = data as Question[];
      console.log(data);
    });
  }
}
