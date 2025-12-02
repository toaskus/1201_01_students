export type Dimension = 'V' | 'A' | 'K' | 'D';

export type Question = {
  id: number;
  title: string;
  options: {
    id: number;
    text: string;
    dimension: Dimension;
  }[];
};

export type Answer = {
  questionId: number;
  scores: {
    optionId: number;
    score: number;
  }[];
};

export type Scores = {
  V: number;
  A: number;
  K: number;
  D: number;
};

export type Result = {
  scores: Scores;
  primary: Dimension[];
  secondary: Dimension[];
};

