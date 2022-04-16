import { Container, MainContent } from "../styles/Home.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "../components/ShowProfileFirstTime";

const TakeQuiz = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent>This is Take Quiz</MainContent>
        </>
      )}
    </Container>
  );
};

export default TakeQuiz;
