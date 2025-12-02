import { Answer, Scores, Result, Dimension, Question } from './types';
import { questions } from './questions';

export function calculateScores(answers: Answer[]): Scores {
  const scores: Scores = { V: 0, A: 0, K: 0, D: 0 };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    answer.scores.forEach(({ optionId, score }) => {
      const option = question.options.find((opt) => opt.id === optionId);
      if (option) {
        scores[option.dimension] += score;
      }
    });
  });

  return scores;
}

export function determineTypes(scores: Scores): Result {
  const entries = Object.entries(scores) as [Dimension, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  const primary: Dimension[] = [];
  const secondary: Dimension[] = [];

  const maxScore = sorted[0][1];
  const secondScore = sorted[1]?.[1] ?? 0;

  // Primary type(s) - 최고 점수
  sorted.forEach(([dimension, score]) => {
    if (score === maxScore) {
      primary.push(dimension);
    }
  });

  // Secondary type(s) - 두 번째 점수
  sorted.forEach(([dimension, score]) => {
    if (score === secondScore && score < maxScore) {
      secondary.push(dimension);
    }
  });

  return {
    scores,
    primary,
    secondary,
  };
}

export function validateAnswers(answers: Answer[]): boolean {
  if (answers.length !== 10) return false;

  for (const answer of answers) {
    const scores = answer.scores.map((s) => s.score).sort((a, b) => b - a);
    const expected = [4, 3, 2, 1];
    
    if (scores.length !== 4) return false;
    if (JSON.stringify(scores) !== JSON.stringify(expected)) return false;
  }

  return true;
}

