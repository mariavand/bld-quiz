export type UserAnswer = Answer & Answer[] & boolean;

export type Answer = {
  readonly a_id: number;
  readonly caption: string;
  readonly correctnessStatus?: boolean;
}
