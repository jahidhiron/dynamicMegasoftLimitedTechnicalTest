import { useEffect, useState } from "react";

import { Container, MainContent } from "../styles/Home.styles";
import {
  CreateQuizWrapper,
  InputWrapper,
  Label,
  Input,
  Button,
  Form,
  AnswerWrapper,
  Answer,
  Choice,
  Devider,
  AllQuestionContainer,
  Error,
} from "../styles/CreateQuiz.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "../components/ShowProfileFirstTime";

const INITIAL_STATE = {
  name: "",
  description: "",
  teacherId: "",
  quiz: [
    {
      question: "",
      choice: [
        {
          firstChoice: "",
          answer: false,
        },
        {
          secondChoice: "",
          answer: false,
        },
        {
          thirdChoice: "",
          answer: "",
        },
        {
          fourthChoice: "",
          answer: "",
        },
        {
          fifthChoice: "",
          answer: "",
        },
      ],
    },
  ],
};

const SINGLE_QUIZ = {
  question: "",
  firstChoice: {
    question: "",
    answer: false,
  },
  secondChoice: {
    question: "",
    answer: false,
  },
  thirdChoice: {
    question: "",
    answer: false,
  },
  fourthChoice: {
    question: "",
    answer: false,
  },
  fifthChoice: {
    question: "",
    answer: false,
  },
};

const CreateQuiz = () => {
  const [singleQuiz, setSingleQuiz] = useState(SINGLE_QUIZ);

  const handleSingleQuizChange = (e) => {
    if (e.target.name === "firstChoiceQuestion") {
      setSingleQuiz((prev) => ({
        ...prev,
        firstChoice: { question: e.target.value },
      }));
    }
    if (e.target.name === "secondChoiceQuestion") {
      setSingleQuiz((prev) => ({
        ...prev,
        secondChoice: { question: e.target.value },
      }));
    }
    if (e.target.name === "thirdChoiceQuestion") {
      setSingleQuiz((prev) => ({
        ...prev,
        thirdChoice: { question: e.target.value },
      }));
    }
    if (e.target.name === "fourthChoiceQuestion") {
      setSingleQuiz((prev) => ({
        ...prev,
        fourthChoice: { question: e.target.value },
      }));
    }
    if (e.target.name === "fifthChoiceQuestion") {
      setSingleQuiz((prev) => ({
        ...prev,
        fifthChoice: { question: e.target.value },
      }));
    }
  };

  const NewQuestion = (index) => {
    return (
      <>
        <InputWrapper>
          <Label style={{ color: "#0a66c2", fontWeight: "bold" }}>
            Question {index}
          </Label>
          <Input type="text" name="question" value={singleQuiz.name} />
        </InputWrapper>

        <InputWrapper>
          <Label>Answer 1</Label>
          <AnswerWrapper>
            <Answer
              type="text"
              name="firstChoiceQuestion"
              value={singleQuiz.firstChoice.question}
              onChange={handleSingleQuizChange}
            ></Answer>
            <Choice
              type="checkbox"
              name="firstChoiceAnswer"
              value={singleQuiz.firstChoice.answer}
              onChange={handleSingleQuizChange}
            ></Choice>
          </AnswerWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Answer 2</Label>
          <AnswerWrapper>
            <Answer
              type="text"
              name="secondChoiceQuestion"
              value={singleQuiz.secondChoice.question}
              onChange={handleSingleQuizChange}
            ></Answer>
            <Choice
              type="checkbox"
              name="secondChoiceAnswer"
              value={singleQuiz.secondChoice.answer}
              onChange={handleSingleQuizChange}
            ></Choice>
          </AnswerWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Answer 3</Label>
          <AnswerWrapper>
            <Answer
              type="text"
              name="thirdChoiceQuestion"
              value={singleQuiz.thirdChoice.question}
              onChange={handleSingleQuizChange}
            ></Answer>
            <Choice
              type="checkbox"
              name="thirdChoiceAnswer"
              value={singleQuiz.thirdChoice.answer}
              onChange={handleSingleQuizChange}
            ></Choice>
          </AnswerWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Answer 4</Label>
          <AnswerWrapper>
            <Answer
              type="text"
              name="fourthChoiceQuestion"
              value={singleQuiz.fourthChoice.question}
              onChange={handleSingleQuizChange}
            ></Answer>
            <Choice
              type="checkbox"
              name="fourthChoiceAnswer"
              value={singleQuiz.fourthChoice.answer}
              onChange={handleSingleQuizChange}
            ></Choice>
          </AnswerWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Answer 5</Label>
          <AnswerWrapper>
            <Answer
              type="text"
              name="fifthChoiceQuestion"
              value={singleQuiz.fifthChoice.question}
              onChange={handleSingleQuizChange}
            ></Answer>
            <Choice
              type="checkbox"
              name="fifthChoiceAnswer"
              value={singleQuiz.fifthChoice.answer}
              onChange={handleSingleQuizChange}
            ></Choice>
          </AnswerWrapper>
        </InputWrapper>
        <Devider />
      </>
    );
  };

  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const [state, setState] = useState([INITIAL_STATE]);
  const [questionsSet, setQuestionsSet] = useState(NewQuestion(1));
  const [questionNo, setQuestionNo] = useState(2);

  const handleChange = () => {};

  const createNewQuestion = (e) => {
    setQuestionNo((prev) => prev + 1);
    setQuestionsSet([questionsSet, NewQuestion(questionNo)]);
  };

  const AllQuestion = () => {
    return <AllQuestionContainer>{questionsSet}</AllQuestionContainer>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent>
            <CreateQuizWrapper>
              <Form>
                <InputWrapper>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={singleQuiz.name}
                    onChange={handleChange}
                  />
                  {/* {errors?.name && <Error>{errors?.name}</Error>} */}
                </InputWrapper>

                <InputWrapper>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={singleQuiz.description}
                    onChange={handleChange}
                  />
                  {/* {errors?.email && <Error>{errors?.email}</Error>} */}
                </InputWrapper>

                <Devider />

                <AllQuestion />
                <Button onClick={createNewQuestion}>New Question</Button>
                <Button onClick={handleSubmit}>Create Quiz</Button>
              </Form>
            </CreateQuizWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default CreateQuiz;
