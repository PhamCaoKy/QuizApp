import { ResponseApi } from "./util.type";

export interface QuizType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}
export type QuizResponse = ResponseApi<[QuizType]>;
