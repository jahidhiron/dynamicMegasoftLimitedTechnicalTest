import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlashMessage from "react-flash-message";
import Popup from "reactjs-popup";

import { Container, MainContent } from "../styles/Home.styles";
import {
  StudentWrapper,
  Label,
  Button,
  Form,
  Error,
  Select,
  Option,
  P,
  PopupMessage,
} from "../styles/StudentCourse.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "../components/ShowProfileFirstTime";
import { getCourses, getCourse } from "../actions/course";
import { createRegistration } from "../actions/registration";

const INITIAL_STATE = {
  name: "",
  description: "",
  studentId: "",
  teacherId: "",
  courseId: "",
};

const StudentCourse = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { courses, course, isGetCourseSuccess, isGetCourseError } = useSelector(
    (state) => state.course
  );

  const { iscreateRegistrationError, iscreateRegistrationSuccess } =
    useSelector((state) => state.registration);

  useEffect(() => {
    dispatch(getCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isGetCourseSuccess) {
      setState({
        name: course.name,
        description: course.description,
        teacherId: course.teacherId,
        studentId: localStorageData?.user?.id,
        courseId: course._id,
      });
    }
  }, [isGetCourseSuccess]);

  const handleLoadData = async (e) => {
    if (e.target.value !== "Select course") {
      await dispatch(getCourse(e.target.value));
      setError("");
    } else {
      setState(INITIAL_STATE);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.courseId) {
      setError("Please select a course!");
    } else {
      await dispatch(createRegistration(state));
      setError("");
    }
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent>
            <StudentWrapper>
              {iscreateRegistrationSuccess && (
                <FlashMessage
                  duration={5000}
                  persistOnHover={true}
                  style={{ marginBottom: "40px", textAlign: "center" }}
                >
                  <P
                    style={{
                      color: "green",
                    }}
                  >
                    {"You has been completed your registration successfully!"}
                  </P>
                </FlashMessage>
              )}
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Label>Select Course</Label>
                <Select onChange={handleLoadData}>
                  <Option value="Select course">Select course</Option>
                  {courses?.length &&
                    courses.map((c) => (
                      <Option value={c._id} key={c._id}>
                        {c.name}
                      </Option>
                    ))}
                </Select>

                {error && (
                  <Error style={{ color: "red" }}>Please select a course</Error>
                )}
                {iscreateRegistrationError?.name && (
                  <Error style={{ color: "red" }}>
                    You have already taken this course
                  </Error>
                )}

                <Popup
                  trigger={
                    <Button
                      type="button"
                      disabled={!state.courseId && true}
                      style={{
                        color: !state.courseId ? "#666" : "#fff",
                        backgroundColor: !state.courseId ? "#ccc" : "#0a66c2",
                      }}
                    >
                      Registration
                    </Button>
                  }
                  position="left center"
                >
                  <PopupMessage>
                    <P
                      style={{
                        textAlign: "center",
                        color: "green",
                      }}
                    >
                      Are you sure you want to take this course?
                    </P>
                    <Button
                      type="submit"
                      style={{
                        color: "green",
                        backgroundColor: "#fff",
                        border: "1px solid green",
                      }}
                      onClick={handleSubmit}
                    >
                      Confirm
                    </Button>
                  </PopupMessage>
                </Popup>
              </Form>
            </StudentWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default StudentCourse;
