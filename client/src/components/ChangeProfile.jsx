import React from "react";
import { useSelector } from "react-redux";

import LeftBar from "./LeftBar";
import { Container, MainContent } from "../styles/Home.styles";
import ShowProfileFirstTime from "./ShowProfileFirstTime";

const ChangeProfile = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            This is Change profile
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default ChangeProfile;
