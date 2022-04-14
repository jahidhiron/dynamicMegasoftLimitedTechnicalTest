import { useSelector } from "react-redux";

import { Container, MainContent } from "../styles/Home.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "./ShowProfileFirstTime";

const Teacher = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>This is Teacher</MainContent>
        </>
      )}
    </Container>
  );
};

export default Teacher;
