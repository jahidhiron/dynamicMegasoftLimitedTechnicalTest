import { Container, MainContent } from "../styles/Home.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "../components/ShowProfileFirstTime";

const ActivityLog = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent>This is activity log</MainContent>
        </>
      )}
    </Container>
  );
};

export default ActivityLog;
