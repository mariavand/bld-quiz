export type Quiz = {
  readonly quiz_id: number;
  readonly title: string;
  readonly description: string;
  readonly questions: Question[];
}

export type Question = {
  readonly q_id: number;
  readonly title: string;
  readonly img: string;
  readonly question_type: 'multiplechoice-single' | 'multiplechoice-single' | 'truefalse';
  readonly possible_answers?: PossibleAnswers[];
  readonly correct_answer: number | number[] | boolean;
  readonly points: number;
}

type PossibleAnswers = {
  readonly a_id: number;
  readonly caption: string;
}
