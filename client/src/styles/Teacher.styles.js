import styled from "styled-components";

// import {
//   mobileSm,
//   mobile,
//   mobileLg,
//   laptop,
//   tablet,
// } from "../utilities/responsive";

export const TeacherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  overflow-x: scroll;
`;

export const Title = styled.span`
  font-size: 30px;
  color: var(--main-color);
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
  display: block;
`;

export const ViewTeacherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 11px;
`;

export const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 11px;
`;
