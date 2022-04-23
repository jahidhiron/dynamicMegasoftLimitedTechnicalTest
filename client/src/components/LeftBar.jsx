import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  LeftBarContainer,
  LeftBarWrapper,
  LeftBarItem,
  Profile,
  ProfilePricture,
  Name,
} from "../styles/LeftBar.styles";
import classes from "../styles/Leftbar.module.css";
import defaultProfile from "../img/default-profile.png";
import { sideBar } from "../reducers/style";
import useWindowDimensions from "../hooks/useWindowDimensions";

const LeftBar = () => {
  const locaStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const handleContent = () => {
    dispatch(sideBar({ width }));
  };

  return (
    <LeftBarContainer toggle={style.sidebar}>
      <LeftBarWrapper className={classes.LeftBar}>
        <Profile>
          <ProfilePricture
            src={
              locaStorageData?.user?.url
                ? locaStorageData?.user?.url
                : defaultProfile
            }
            alt="profile"
          />
          <Name>{locaStorageData.user.name}</Name>
        </Profile>
        <NavLink
          to="/dashboard"
          className={classes.leftBarLink}
          onClick={handleContent}
        >
          <LeftBarItem>Dashboard</LeftBarItem>
        </NavLink>
        {locaStorageData?.user?.role === "admin" && (
          <>
            <NavLink
              to="/teacher"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Teacher</LeftBarItem>
            </NavLink>
            <NavLink
              to="/student"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Student</LeftBarItem>
            </NavLink>
          </>
        )}

        {locaStorageData?.user?.role === "teacher" && (
          <>
            <NavLink
              to="/teacher-course"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Course</LeftBarItem>
            </NavLink>
            <NavLink
              to="/create-quiz"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Create Quiz</LeftBarItem>
            </NavLink>
            <NavLink
              to="/take-quiz"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Take Quiz</LeftBarItem>
            </NavLink>
          </>
        )}
        {locaStorageData?.user?.role === "student" && (
          <>
            <NavLink
              to="/student-course"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Course</LeftBarItem>
            </NavLink>
            <NavLink
              to="/give-quiz"
              className={classes.leftBarLink}
              onClick={handleContent}
            >
              <LeftBarItem>Quiz</LeftBarItem>
            </NavLink>
          </>
        )}

        <NavLink
          to="/activity-log"
          className={classes.leftBarLink}
          onClick={handleContent}
        >
          <LeftBarItem>Activity Log</LeftBarItem>
        </NavLink>

        <NavLink
          to="/update-profile"
          className={classes.leftBarLink}
          onClick={handleContent}
        >
          <LeftBarItem>Update Profile</LeftBarItem>
        </NavLink>
        <NavLink
          to="/view-profile"
          className={classes.leftBarLink}
          onClick={handleContent}
        >
          <LeftBarItem>View Profile</LeftBarItem>
        </NavLink>
        <NavLink
          to="/change-password"
          className={classes.leftBarLink}
          onClick={handleContent}
        >
          <LeftBarItem>Change Password</LeftBarItem>
        </NavLink>
      </LeftBarWrapper>
    </LeftBarContainer>
  );
};

export default LeftBar;
