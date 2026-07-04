import { Component } from '@angular/core';
import { TestResults } from '../models/TestResults';

enum AppMode {
  PreTestQuestions = "PreTestQuestions",
  Test = "Test",
  PostTestQuestions = "PostTestQuestions",
  HandoffPrompt = "HandoffPrompt",
  ResearcherFileSelect = "ResearcherFileSelect"
}

enum WhichTest {
  FirstTest = "first",
  SecondTest = "second"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Type fast.';

  appMode = AppMode.PreTestQuestions;

  whichTest = WhichTest.FirstTest;
  familiarTest = WhichTest.FirstTest;

  private typeTestFocusFunction: () => void;

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
    this.appMode = AppMode.Test;
  }

  onTestFinished(results: TestResults): void {
    // send the results to the savedata
    console.log("Test Finished!");

    if (this.whichTest == WhichTest.FirstTest) {
      this.whichTest = WhichTest.SecondTest;
    } else {
      this.appMode = AppMode.PostTestQuestions;
    }
  }
}
