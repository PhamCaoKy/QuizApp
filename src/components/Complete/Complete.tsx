import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompleteQuiz } from "../Quiz/Quiz";

interface ResultQuiz {
  point: number;
  totalQuiz: number;
  second: number;
  completeQuiz: Array<CompleteQuiz>;
}
export default function Complete() {
  const navigate = useNavigate();
  const Location = useLocation();
  const resultQuiz: ResultQuiz = Location.state;
  const isPass = Boolean(resultQuiz.totalQuiz / resultQuiz.point < 2);
  const completeQuiztt = resultQuiz.completeQuiz;
  
  return (
    <div
      className="flex flex-col justify-center items-center container "
      style={{ height: "100vh" }}
    >
      {isPass ? (
        <Card className="mt-6 w-96">
          <CardHeader className="relative h-56">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5511/5511415.png"
              alt="img-blur-shadow"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Congratulations !!!
            </Typography>
            <Typography>You are amazing!!</Typography>
            <Typography>
              {`${resultQuiz.point}/${resultQuiz.totalQuiz} correct answers in ${resultQuiz.second} seconds`}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              color="red"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              Play Again
            </Button>
            <Button
              color="green"
              className="rounded-full ml-2"
              onClick={() => navigate("/resultquiz",{state: completeQuiztt})}
            >
              Review
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mt-6 w-96">
          <CardHeader className="relative h-56">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1969/1969111.png"
              alt="img-blur-shadow"
              className="object-scale-down h-full w-full"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Completed !!!
            </Typography>
            <Typography>Better luck next time!</Typography>
            <Typography>
              {`${resultQuiz.point}/${resultQuiz.totalQuiz} correct answers in ${resultQuiz.second} seconds`}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              color="red"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              Play Again
            </Button>

            <Button
              color="green"
              className="rounded-full ml-2"
              onClick={() => navigate("/resultquiz",{state: completeQuiztt})}
            >
              Review
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
