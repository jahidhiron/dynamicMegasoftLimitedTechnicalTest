import Profile from "../pages/Profile";

const ShowProfileFirstTime = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));

  const { isFirstLogin } = localStorageData.user;

  if (isFirstLogin) {
    return <Profile />;
  }
  return null;
};

export default ShowProfileFirstTime;
