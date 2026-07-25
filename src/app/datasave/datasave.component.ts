import { Component, OnInit, inject } from '@angular/core';
import { DatacollectorService } from '../datacollector.service';

@Component({
  selector: 'app-datasave',
  templateUrl: './datasave.component.html',
  styleUrls: ['./datasave.component.scss']
})
export class DatasaveComponent implements OnInit {

  datacollectionService;
  data;

  newsheet_password = "";
  newsheet_confirm_password = "";
  newsheet_message = "";

  savesheet_password = "";
  savesheet_message = "";

  result_message = "";

  constructor(
    private dS: DatacollectorService
  ) {
    this.datacollectionService = dS;
    this.data = this.datacollectionService.getData();
  }

  ngOnInit(): void {

  }

  onNewSheetClicked() {
    if (this.newsheet_password !== this.newsheet_confirm_password) {
      this.newsheet_message = "passwords do not match.";
      return;
    }
    if (this.newsheet_password.length < 16) {
      this.newsheet_message = "password is not long enough to meet modern security recommendations.";
      return;
    }
    let pw = this.newsheet_password;
    this.newsheet_password = "";
    this.newsheet_confirm_password = "";
    (window as any).electronAPI.createSheet("test_name.xlsx", pw);
  }

  onSaveDataClicked() {
    if (this.savesheet_password.length < 16) {
      this.savesheet_message = "password is not long enough to meet modern security recommendations.";
      return;
    }

    let pw = this.savesheet_password;
    this.savesheet_password = "";
    let result = (window as any).electronAPI.appendData(pw, this.data);
    result.then(response => {
      if (response.error) {
        this.result_message = response.message;
      } else {
        alert("Data Saved Successfully");
        localStorage.clear();
        (window as any).electronAPI.quit();
      }
    });

  }

  newSheetPasswordsChanged() {
    this.newsheet_message = "";
  }

  saveSheetPasswordChanged() {
    this.savesheet_message = "";
  }

}
