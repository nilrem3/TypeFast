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

  newsheet_password;
  newsheet_confirm_password;
  newsheet_message = "";

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

  newSheetPasswordsChanged() {
    this.newsheet_message = "";
  }

}
