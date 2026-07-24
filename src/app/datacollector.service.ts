import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacollectorService {

  constructor() { }

  pretestquestiondata: Map<string, string>;
  nomusictestdata: any;
  familiartestdata: any;
  unfamiliartestdata: any;
  posttestquestiondata: any;
  testorderinfo: any;

  setPretestQuestionData(data: Map<string, string>) {
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

  setTestorderData(data) {
    this.testorderinfo = data;
  }

  getData() {
    return {
      "pretest": this.pretestquestiondata,
      "nomusic": this.nomusictestdata,
      "familiar": this.familiartestdata,
      "unfamiliar": this.unfamiliartestdata,
      "posttest": this.posttestquestiondata,
      "orderinfo": this.testorderinfo
    }
  }
}
