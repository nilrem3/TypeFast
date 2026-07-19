export interface TestResults {
  correctCharacterCount: number;
  incorrectCharacterCount: number;
  spaceCharacterCount: number;
  unnecessarySpaceCharacterCount: number;
  correctWordCount: number;
  incorrectWordCount: number;
  timeElapsed: number;
  stats?: TestResultsStats;
}

export interface IncorrectWord {
  expected: string;
  value: string;
}

export interface TestResultsStats {
  characterAccuracy: number;
  wordAccuracy: number;
  cpm: number;
  wpm: number;
}
