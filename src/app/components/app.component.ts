import { Component } from '@angular/core';

enum AppMode {
  PreTestQuestions = "PreTestQuestions",
  Test = "Test",
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

  showAbout = false;
  appMode = AppMode.PreTestQuestions;

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

  preferencesAboutClicked(): void {
    this.showAbout = true;
  }

  closeAbout(): void {
    this.showAbout = false;
  }
}
