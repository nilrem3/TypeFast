import { Component, inject } from '@angular/core';
import { DatacollectorService } from '../datacollector.service';
import { TestResults } from '../models/TestResults';

enum AppMode {
  PreTestQuestions = "PreTestQuestions",
  Test1 = "Test1",
  Test2 = "Test2",
  Test3 = "Test3",
  PostTestQuestions = "PostTestQuestions",
  HandoffPrompt = "HandoffPrompt",
  ResearcherFileSelect = "ResearcherFileSelect"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Type fast.';

  appMode = AppMode.PreTestQuestions;

  familiarTest;
  nomusicTest;

  datacollectionService: DatacollectorService;

  private typeTestFocusFunction: () => void;

  constructor(private dS: DatacollectorService) {
    this.datacollectionService = dS;

    let testOrder = [AppMode.Test1, AppMode.Test2, AppMode.Test3];
    this.shuffle(testOrder);

    this.familiarTest = testOrder[0];
    this.nomusicTest = testOrder[1];
    this.datacollectionService.setTestorderData({
      "familiar": testOrder[0],
      "unfamiliar": testOrder[2],
      "nomusic": testOrder[1]
    });
  }

  onFocusFunctionReady(focusFunction: () => void): void {
    if (focusFunction) {
      this.typeTestFocusFunction = focusFunction;
    }
  }

  onBeginClicked(): void {
    this.appMode = AppMode.Test1;
  }

  onSubmitClicked(): void {
    this.appMode = AppMode.HandoffPrompt;
  }

  onNextClicked(): void {
    this.appMode = AppMode.ResearcherFileSelect;
  }

  onTestNextPressed(results: TestResults): void {
    // send the results to the savedata

    if (this.appMode === this.nomusicTest) {
      this.datacollectionService.setNoMusicTestData(results);
    } else if (this.appMode == this.familiarTest) {
      this.datacollectionService.setFamiliarTestData(results);
    } else {
      this.datacollectionService.setUnfamiliarTestData(results);
    }

    if (this.appMode == AppMode.Test1) {
      this.appMode = AppMode.Test2;
    } else if (this.appMode == AppMode.Test2) {
      this.appMode = AppMode.Test3;
    } else {
      this.appMode = AppMode.PostTestQuestions;
    }
  }

  shuffle(array): void {
    let current_idx = array.length;
    while (current_idx != 0) {
      let random_idx = Math.floor(Math.random() * current_idx);
      current_idx -= 1;
      let t = array[current_idx];
      array[current_idx] = array[random_idx];
      array[random_idx] = t;
    }
  }
}
