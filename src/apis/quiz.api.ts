
import { QuizResponse } from "../types/quiz.type";
import http from "../utils/http";

export const getQuiz = () => http.get<QuizResponse>("/api.php?amount=5");
