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

  constructor(
    private dS: DatacollectorService
  ) {
    this.datacollectionService = dS;
    this.data = this.datacollectionService.getData();
  }

  ngOnInit(): void {

  }

}
