export type UserAnswer = {
  readonly [key: number]: boolean | Answer | Answer[]
}

type Answer = {
  readonly a_id: number;
  readonly caption: string;
}
