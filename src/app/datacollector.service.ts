import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacollectorService {

  constructor() { }

  pretestquestiondata: any;
  nomusictestdata: any;
  familiartestdata: any;
  unfamiliartestdata: any;
  posttestquestiondata: any;

  setPretestQuestionData(data) {
    this.pretestquestiondata = data;
  }

  setNoMusicTestData(data) {
    this.nomusictestdata = data;
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
      "nomusic": this.nomusictestdata,
      "familiar": this.familiartestdata,
      "unfamiliar": this.unfamiliartestdata,
      "posttest": this.posttestquestiondata
    }
  }
}
