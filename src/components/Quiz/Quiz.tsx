import { Button, Radio, Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getQuiz } from "../../apis/quiz.api";
import { QuizType } from "../../types/quiz.type";

export interface CompleteQuiz {
  question: string;
  listAnswer: Array<string>;
  correctAswer: string;
  choiceAnwser: string;
}
const initalCompleteQuiz = {
  question: "",
  listAnswer: [],
  correctAswer: "",
  choiceAnwser: "",
};

export default function Quiz() {
  const [curCardId, setCurCardId] = useState(1);
  const [activeQuiz, setActiveQuiz] = useState<QuizType>();
  const [answer, setAnswer] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [point, setPoint] = useState(0);
  const [second, setSecond] = useState(0);
  const [completeQuiz, setCompleteQuiz] = useState<[CompleteQuiz]>([
    initalCompleteQuiz,
  ]);

  const navigate = useNavigate();

  const [apiCalled, setApiCalled] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prevSecond) => prevSecond + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (apiCalled) {
      return;
    }
    getQuiz().then((_) => {
      setApiCalled(true);
    });
  }, [apiCalled]);

  const { data, isSuccess } = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
    enabled: apiCalled,
  });
  useEffect(() => {
    if (!apiCalled) {
      setApiCalled(true);
    }
  }, [apiCalled]);

  const listQuiz = data?.data.results;
  const totalQuiz = listQuiz?.length as number;
  const randomIndex = Math.floor(Math.random() * totalQuiz);

  useEffect(() => {
    const quiz = listQuiz?.find(
      (_: any, index: number) => index + 1 === curCardId
    );
    quiz?.incorrect_answers.splice(randomIndex, 0, quiz.correct_answer);
    setActiveQuiz(quiz);
  }, [curCardId, isSuccess]);

  const goToNext = () => {
    if (isValidId(curCardId + 1)) {
      setCompleteQuiz((prev) => {
        prev?.push({
          question: activeQuiz?.question as string,
          choiceAnwser: answer,
          correctAswer: activeQuiz?.correct_answer as string,
          listAnswer: activeQuiz?.incorrect_answers as Array<string>,
        });
        return prev;
      });

      setCurCardId(curCardId + 1);
      setAnswer("");
      setIsChecked(false);
    } else {
      navigate("/complete", {
        state: {
          point: point,
          totalQuiz: totalQuiz,
          second: second,
          completeQuiz: completeQuiz,
        },
      });
    }
  };
  const isValidId = (id: number) => {
    return id <= totalQuiz && id >= 1;
  };

  return (
    <div>
      {totalQuiz > 0 ? (
        <div
          className="flex flex-col justify-center items-center container "
          style={{ height: "100vh" }}
        >
          <Link to="/" className="text-white ml-96 mb-12 text-xl">
            X
          </Link>
          <div className="text-white text-3xl mb-10">
            <p>{`Question ${curCardId}/${totalQuiz}`}</p>
          </div>
          <div className="text-white text-2xl mb-10">
            <p>{activeQuiz?.question}</p>
          </div>
          <Fragment>
            {activeQuiz?.incorrect_answers.map((value, index) => (
              <label
                id={value}
                className={
                  !isChecked || value !== answer
                    ? "flex justify-between border-4 border-slate-200 rounded-full w-96 mb-4 disabled:opacity-25 text-white"
                    : activeQuiz.correct_answer === value
                    ? "rounded-full w-96 mb-4 flex justify-between border-4 border-green-800 text-green-800 "
                    : "rounded-full w-96 mb-4 flex justify-between border-4 border-red-800 text-red-800"
                }
                key={index}
                onClick={() => setIsChecked(true)}
              >
                <div className="mt-2 ml-5 ">
                  <Typography>{value}</Typography>
                </div>
                <Radio
                  id={value}
                  name="type"
                  style={{ color: "white" }}
                  onChange={() => {
                    setAnswer(value);
                    if (value === activeQuiz.correct_answer) {
                      setPoint((prev) => prev + 1);
                    }
                  }}
                  disabled={isChecked && Boolean(answer)}
                  checked={value === answer}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  }
                />
              </label>
            ))}
          </Fragment>
          {answer ? (
            <Button
              color="red"
              className="rounded-full w-80"
              onClick={goToNext}
            >
              Next
            </Button>
          ) : (
            <Button color="gray" disabled={true} className="rounded-full w-80">
              Next
            </Button>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center container "
          style={{ height: "100vh" }}
        >
          <Spinner color="pink" className="h-12 w-12" />
        </div>
      )}
    </div>
  );
}
