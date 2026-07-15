export interface Question {
  type: "free-response" | "multiple-choice";
  text: string;
  data: FreeResponseQuestion | MultipleChoiceQuestion
}

export interface FreeResponseQuestion {
}

export interface MultipleChoiceQuestion {
  options: MultipleChoiceOption[];
}

export interface MultipleChoiceOption {
  text: string;
  followup?: Question
}

// returns the total number of columns needed to fit the answer to this question
// (and all subquestions)
export function numColumns(q: Question) {
  if (q.type === "free-response") {
    return 1
  }
  if (q.type === "multiple-choice") {
    let data = q.data as MultipleChoiceQuestion;
    let total = 1;
    for (const response of data.options) {
      if (response.followup) {
        total += numColumns(response.followup);
      }
    }
    return total;
  }
  // unrecognized question type
  return -1;
}
