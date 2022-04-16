import styled from "styled-components";

import { laptop, tablet, mobileSm } from "../utilities/responsive";

export const StudentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  width: 100%;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 50%;
  border: 2px solid var(--main-color);
  padding: 50px;
  border-radius: 20px;
  margin-top: 50px;
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

  ${laptop({ width: "50%" })}
  ${tablet({ width: "60%" })}
  ${mobileSm({ width: "95%" })}
`;

export const Error = styled.span`
  color: red;
  font-size: 16px;
  margin-top: 5px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Option = styled.option``;

export const P = styled.p``;

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
