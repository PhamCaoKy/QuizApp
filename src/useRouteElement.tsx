import { useRoutes } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Complete from "./components/Complete";
import ResultQuiz from "./components/ResultQuiz";
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: "/",
      element: <Start />,
    },
    {
      path: "quizs",
      element: <Quiz />,
    },
    {
      path: "complete",
      element: <Complete />,
    },
    {
      path: "resultquiz",
      element: <ResultQuiz />,
    },
  ]);
  return routeElement;
}
