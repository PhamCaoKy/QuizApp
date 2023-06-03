import { Typography, Radio, Button } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CompleteQuiz } from "../Quiz/Quiz";

export default function ResultQuiz() {
  const [curCardId, setCurCardId] = useState(2);
  const [activeQuiz, setActiveQuiz] = useState<CompleteQuiz>();
  const Location = useLocation();
  const navigate = useNavigate();
  const completeQuiz: [CompleteQuiz] = Location.state;
  const totalQuiz = completeQuiz.length;

  useEffect(() => {
    const quiz = completeQuiz?.find(
      (_: any, index: number) => index + 1 === curCardId
    );

    setActiveQuiz(quiz);
  }, [curCardId]);


  const goToNext = () => {
    if (isValidId(curCardId + 1)) {
      setCurCardId(curCardId + 1);
    } else {
      navigate("/");
    }
  };
  const isValidId = (id: number) => {
    return id <= totalQuiz && id >= 1;
  };
  return (
    <div
      className="flex flex-col justify-center items-center container "
      style={{ height: "100vh" }}
    >
      <Link to="/" className="text-white ml-96 mb-12 text-xl">
        X
      </Link>

      <div className="text-white text-2xl mb-10">
        <p>{activeQuiz?.question}</p>
      </div>
      <Fragment>
        {activeQuiz?.listAnswer.map((value, index) => (
          <label
            className={
              value !== activeQuiz.correctAswer
                ? "rounded-full w-96 mb-4 flex justify-between border-4 border-red-800 text-red-800"
                : "rounded-full w-96 mb-4 flex justify-between border-4 border-green-800 text-green-800 "
            }
            key={index}
          >
            <div className="mt-2 ml-5 ">
              <Typography>
                {activeQuiz.choiceAnwser === value
                  ? `${value} (Your choice)`
                  : value}
              </Typography>
            </div>
            <Radio
              name="type"
              style={{ color: "white" }}
              disabled={true}
              checked={activeQuiz.choiceAnwser === value}
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
      <Button color="red" className="rounded-full w-80" onClick={goToNext}>
        Next
      </Button>
    </div>
  );
}
