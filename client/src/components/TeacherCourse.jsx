import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import FlashMessage from "react-flash-message";

import { Container, MainContent } from "../styles/Home.styles";
import {
  CourseWrapper,
  CourseWrapperTop,
  CourseWrapperBottom,
  CourseWrapperTopLeft,
  CourseWrapperTopRight,
  Form,
  InputWrapper,
  Label,
  Input,
  Button,
  Error,
  Select,
  Option,
  ButtonWrapper,
  PopupMessage,
  P,
  ViewWrapper,
  Table,
  Tr,
  Th,
  Td,
  Title,
  Thead,
  Tbody,
  Search,
} from "../styles/TeacherCourse.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "../components/ShowProfileFirstTime";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
} from "../actions/course";
import {
  createCourseValidation,
  updateCourseValidation,
} from "../utilities/validations/course";

const INITIAL_COURSE = {
  name: "",
  description: "",
  teacherId: "",
};

const TeacherCourse = () => {
  const dispatch = useDispatch();
  const {
    course,
    courses,
    iscreateCourseSuccess,
    iscreateCourseError,
    isGetCourseSuccess,
    isUpdateCourseSuccess,
    isUpdateCourseError,
    isDeleteCourseSuccess,
    isDeleteCourseError,
    searchCourseData,
    isSearchCourseSuccess,
  } = useSelector((state) => state.course);
  const [state, setState] = useState(INITIAL_COURSE);
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const [courseError, setCourseError] = useState(INITIAL_COURSE);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(getCourses(localStorageData?.user?.id));
  }, []);

  useEffect(() => {
    if (isGetCourseSuccess) {
      setState({ name: course.name, description: course.description });
    }
  }, [isGetCourseSuccess]);

  useEffect(() => {
    if (iscreateCourseSuccess) {
      setCourseError(INITIAL_COURSE);
      setState(INITIAL_COURSE);
      dispatch(getCourses(localStorageData?.user?.id));
    } else if (iscreateCourseError) {
      setCourseError({
        name: iscreateCourseError?.name,
        description: iscreateCourseError?.description,
      });
    }
  }, [iscreateCourseSuccess, iscreateCourseError]);

  useEffect(() => {
    if (isUpdateCourseSuccess) {
      setCourseError(INITIAL_COURSE);
      setState(INITIAL_COURSE);
      dispatch(getCourses(localStorageData?.user?.id));
    } else if (isUpdateCourseError) {
      setCourseError({
        name: isUpdateCourseError?.name,
        description: isUpdateCourseError?.description,
      });
    }
  }, [isUpdateCourseSuccess, isUpdateCourseError]);

  useEffect(() => {
    if (isDeleteCourseSuccess) {
      setCourseError(INITIAL_COURSE);
      setState(INITIAL_COURSE);
      dispatch(getCourses(localStorageData?.user?.id));
    }
  }, [isDeleteCourseSuccess]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = createCourseValidation(state);
    if (name || description) {
      setCourseError({ name, description });
    } else {
      setState({ ...state, teacherId: localStorageData?.user?.id });
      await dispatch(createCourse(state));
    }
  };

  const handleLoadData = async (e) => {
    if (e.target.value !== "Select course") {
      await dispatch(getCourse(e.target.value));
    } else {
      setState(INITIAL_COURSE);
    }
  };

  const handleUpdate = async (e) => {
    const { name, description } = updateCourseValidation(state);
    if (name || description) {
      setCourseError({ name, description });
    } else {
      await dispatch(updateCourse(course._id, state));
    }
  };

  const handleDelete = async (e) => {
    await dispatch(deleteCourse(course._id));
  };

  // search debounce
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 300);
    };
  };

  const handleSearchText = async (value) => {
    await dispatch(searchCourse(value, localStorageData?.user.id));
  };

  const optimizedFn = useCallback(debounce(handleSearchText), []);

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent>
            <CourseWrapper>
              {iscreateCourseSuccess && (
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
                    {"Course has been created successfully!"}
                  </P>
                </FlashMessage>
              )}

              {isUpdateCourseSuccess && (
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
                    {"Course has been updated successfully!"}
                  </P>
                </FlashMessage>
              )}

              {isDeleteCourseSuccess && (
                <FlashMessage
                  duration={5000}
                  persistOnHover={true}
                  style={{ marginBottom: "40px", textAlign: "center" }}
                >
                  <P
                    style={{
                      color: "red",
                    }}
                  >
                    {"Course has been deleted successfully!"}
                  </P>
                </FlashMessage>
              )}
              <CourseWrapperTop style={{ marginTop: "20px" }}>
                <CourseWrapperTopLeft>
                  <Form onSubmit={handleSubmit}>
                    <InputWrapper>
                      <Label>Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                      />
                      {courseError?.name && <Error>{courseError?.name}</Error>}
                    </InputWrapper>

                    <InputWrapper>
                      <Label>Description</Label>
                      <Input
                        type="text"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                      />
                      {courseError?.description && (
                        <Error>{courseError?.description}</Error>
                      )}
                    </InputWrapper>
                    <Button type="submit">Create Course</Button>
                  </Form>
                </CourseWrapperTopLeft>
                <CourseWrapperTopRight>
                  <Select onChange={handleLoadData}>
                    <Option value="Select course">Select course</Option>
                    {courses?.length &&
                      courses.map((c) => (
                        <Option value={c._id} key={c._id}>
                          {c.name}
                        </Option>
                      ))}
                  </Select>
                  <ButtonWrapper>
                    {/* update course */}
                    <Popup
                      trigger={
                        <Button
                          type="button"
                          disabled={(!state.name || !state.description) && true}
                          style={{
                            color:
                              (!state.name || !state.description) && "#666",
                            backgroundColor:
                              (!state.name || !state.description) && "#ccc",
                          }}
                        >
                          Update
                        </Button>
                      }
                      position="left center"
                    >
                      <PopupMessage>
                        <P
                          style={{
                            textAlign: "center",
                            color: "#666",
                          }}
                        >
                          Are you sure you want to upadte this course?
                        </P>
                        <ButtonWrapper>
                          <Button
                            style={{
                              border: "1px solid #F7B217",
                              color: "#F7B217",
                              backgroundColor: "#eee",
                            }}
                            onClick={handleUpdate}
                          >
                            Confirm
                          </Button>
                        </ButtonWrapper>
                      </PopupMessage>
                    </Popup>

                    {/* delete course */}

                    <Popup
                      trigger={
                        <Button
                          type="button"
                          disabled={(!state.name || !state.description) && true}
                          style={{
                            color:
                              !state.name || !state.description
                                ? "#666"
                                : "#fff",
                            backgroundColor:
                              !state.name || !state.description
                                ? "#ccc"
                                : "red",
                          }}
                        >
                          Delete
                        </Button>
                      }
                      position="left center"
                    >
                      <PopupMessage>
                        <P
                          style={{
                            textAlign: "center",
                            color: "red",
                          }}
                        >
                          Are you sure you want to delete this course?
                        </P>
                        <ButtonWrapper>
                          <Button
                            style={{
                              border: "1px solid red",
                              color: "red",
                              backgroundColor: "#eee",
                            }}
                            onClick={handleDelete}
                          >
                            Confirm
                          </Button>
                        </ButtonWrapper>
                      </PopupMessage>
                    </Popup>
                  </ButtonWrapper>
                </CourseWrapperTopRight>
              </CourseWrapperTop>
              <Title>All Course information</Title>
              <Search
                name="searchText"
                onChange={(e) => {
                  optimizedFn(e.target.value);
                  if (e.target.value.length > 0) {
                    setIsSearching(true);
                  } else {
                    setIsSearching(false);
                  }
                }}
                placeholder="Search course"
              />
              <CourseWrapperBottom>
                <ViewWrapper>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {isSearching
                        ? searchCourseData?.length
                          ? searchCourseData.map((c) => (
                              <Tr key={c._id}>
                                <Td>{c.name}</Td>
                                <Td>{c.description}</Td>
                                <Td
                                  style={{
                                    color: c.status ? "green" : "#F7B217",
                                  }}
                                >
                                  {c.status ? "Available" : "Unavailable"}
                                </Td>
                              </Tr>
                            ))
                          : null
                        : courses.length &&
                          courses.map((c) => (
                            <Tr key={c._id}>
                              <Td>{c.name}</Td>
                              <Td>{c.description}</Td>
                              <Td
                                style={{
                                  color: c.status ? "green" : "#F7B217",
                                }}
                              >
                                {c.status ? "Available" : "Unavailable"}
                              </Td>
                            </Tr>
                          ))}
                    </Tbody>
                  </Table>
                </ViewWrapper>
              </CourseWrapperBottom>
            </CourseWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default TeacherCourse;
