export interface Question {
  type: "free-response" | "multiple-choice";
  id: string;
  text: string;
  data: any; // FreeReponseQuestion | MultipleChoiceQuestion, but need to have it be any for type checker reasons
}

export interface FreeResponseQuestion {
}

export interface MultipleChoiceQuestion {
  options: MultipleChoiceOption[];
}

export interface MultipleChoiceOption {
  text: string;
  followup?: Question;
  image_url?: string;
  image_attribution?: string;
}

export type NO_ANSWER = 0;
export const NO_ANSWER: NO_ANSWER = 0;
