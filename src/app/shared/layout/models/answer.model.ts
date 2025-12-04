export type UserAnswer = Answer & Answer[] & boolean;

type Answer = {
  readonly a_id: number;
  readonly caption: string;
}
