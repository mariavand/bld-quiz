export type Score = {
  readonly quiz_id: number;
  readonly results: Result[];
}

type Result = {
  readonly r_id: number;
  readonly minpoints: number;
  readonly maxpoints: number;
  readonly title: string;
  readonly message: string;
  readonly img: string;
}
