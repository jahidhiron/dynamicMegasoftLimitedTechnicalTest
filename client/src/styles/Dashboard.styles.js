import styled from "styled-components";
// import { mobileLg } from "../utilities/responsive";

export const MainContent = styled.div`
  width: 100vw;
  height: calc(60vh - 55px);
  background-color: var(--footer-color);
  display: flex;
  padding: 50px;
`;

export const DashboardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

export const DashboardWrapperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
`;

export const DashboardWrapperMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
`;

export const DashboardWrapperBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
`;

export const DashboardWrapperLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid var(--main-color);
  width: 48%;
  margin-right: 4%;
  padding: 20px;
  border-radius: 20px;
`;

export const DashboardWrapperRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid var(--main-color);
  width: 48%;
  padding: 20px;
  border-radius: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  overflow-x: scroll;
`;

export const Title = styled.span`
  font-size: 20px;
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

export const PaginationContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Movement = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-color);
  padding: 3px;
  border-radius: 6px;
  transition: all 0.4s ease;
  margin-right: 20px;

  &:hover {
    background-color: var(--main-color);
    color: white;
  }
`;

export const PageNumber = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-color);
  padding: 3px;
  border-radius: 50%;
  transition: all 0.4s ease;
  width: 25px;
  height: 25px;
  text-align: center;
  margin-right: 20px;

  &:hover {
    background-color: var(--main-color);
    color: white;
  }
`;

export const Input = styled.input`
  width: 30px;
  height: 20px;
  border: 1px solid var(--main-color);
  text-align: center;
`;

export const Label = styled.label`
  margin-right: 10px;
  margin-left: 10px;
`;
