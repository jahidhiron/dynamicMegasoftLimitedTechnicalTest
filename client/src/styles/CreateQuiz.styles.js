import styled from "styled-components";

import { laptop, tablet, mobileSm } from "../utilities/responsive";

export const CreateQuizWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const Form = styled.div`
  width: 60%;
`;

export const Label = styled.label`
  color: rgb(0, 0, 0, 0.6);
  font-size: 16px;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 0px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.6);
  padding-left: 10px;

  &::placeholder {
    color: rgb(0, 0, 0, 0.6);
  }

  &:focus {
    outline: none !important;
  }
`;

export const Button = styled.button`
  border: none;
  padding: 6px 15px;
  background-color: var(--main-color);
  color: #fff;
  width: 40%;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 40px;

  &:hover {
    background-color: #004182;
  }

  ${laptop({ width: "50%" })}
  ${tablet({ width: "60%" })}
  ${mobileSm({ width: "95%" })}
`;

export const Error = styled.span`
  color: red;
  font-size: 16px;
  margin-top: 5px;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Answer = styled.input`
  width: 80%;
  margin-right: 20%;
  padding: 6px 0px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.6);
  padding-left: 10px;
`;

export const Choice = styled.input`
  cursor: pointer;
`;

export const Devider = styled.div`
  border-bottom: 2px solid var(--main-color);
  width: 100%;
  margin: 40px auto;
`;

export const AllQuestionContainer = styled.div``;
