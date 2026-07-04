import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacollectorService {

  constructor() { }

  pretestquestiondata: any;
  familiartestdata: any;
  unfamiliartestdata: any;
  posttestquestiondata: any;

  setPretestQuestionData(data) {
    this.pretestquestiondata = data;
  }

  setFamiliarTestData(data) {
    this.familiartestdata = data;
  }

  setUnfamiliarTestData(data) {
    this.unfamiliartestdata = data;
  }

  setPosttestQuestionData(data) {
    this.posttestquestiondata = data;
  }

  getData() {
    return {
      "pretest": this.pretestquestiondata,
      "familiar": this.familiartestdata,
      "unfamiliar": this.unfamiliartestdata,
      "posttest": this.posttestquestiondata
    }
  }
}
