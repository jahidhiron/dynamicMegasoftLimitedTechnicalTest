import styled from "styled-components";

import { laptop, tablet } from "../utilities/responsive";

export const CourseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid;
  width: 100%;
  height: 100%;
`;

export const CourseWrapperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
  margin-bottom: 5%;
`;

export const CourseWrapperTopLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
  height: 100%;
  margin-right: 5%;
  border: 1px solid black;
  border-radius: 15px;
  background-color: #f3f2ef;
`;

export const CourseWrapperTopRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 100%;
  border: 1px solid black;
  border-radius: 15px;
  background-color: #f3f2ef;
  flex-direction: column;
`;

export const CourseWrapperBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65%;
  border: 1px solid black;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  width: 80%;
  padding: 40px;

  ${laptop({ width: "100%" })}
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
  margin-top: 20px;

  &:hover {
    background-color: #004182;
  }

  ${laptop({ width: "60%" })}
  ${tablet({ width: "100%" })}
`;

export const Error = styled.span`
  color: red;
  font-size: 16px;
  margin-top: 5px;
`;

export const Select = styled.select`
  width: 80%;
  padding: 10px;
  cursor: pointer;
`;

export const Option = styled.option``;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PopupMessage = styled.div`
  width: 200px;
  height: 150px;
  border: 1px solid var(--main-color);
  margin: 0 auto;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
`;

export const P = styled.p`
  display: block;
`;

export const Title = styled.span`
  font-size: 30px;
  color: var(--main-color);
  text-align: center;
  margin-top: 0px;
  margin-bottom: 10px;
  display: block;
`;

export const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
`;

export const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #eee;
  }
`;

export const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 12px;
`;

export const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 11px;
`;

export const Search = styled.input`
  border: 1px solid var(--main-color);
  padding: 3px 10px;
  margin-bottom: 20px;
  margin-left: 2.5%;
`;
