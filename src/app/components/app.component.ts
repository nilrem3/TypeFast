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

  familiarTest = AppMode.Test2; // could also be Test3, but not Test1

  datacollectionService: DatacollectorService;

  private typeTestFocusFunction: () => void;

  constructor(private dS: DatacollectorService) {
    this.datacollectionService = dS;
    this.familiarTest = Math.random() > 0.5 ? AppMode.Test2 : AppMode.Test3;
  }

  onPreferencesToggled(show: boolean): void {
    if (show === false && this.typeTestFocusFunction) {
      this.typeTestFocusFunction();
    }
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

    if (this.appMode == AppMode.Test1) { // no music
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
}
