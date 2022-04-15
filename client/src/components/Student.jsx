import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, Block, Check } from "@material-ui/icons";
import FlashMessage from "react-flash-message";
import Popup from "reactjs-popup";

import { Container, MainContent } from "../styles/Home.styles";
import {
  StudentWrapper,
  ViewStudentWrapper,
  Table,
  Tr,
  Th,
  Td,
  Title,
  Thead,
  Tbody,
  PaginationContainer,
  PaginationWrapper,
  Movement,
  PageNumber,
  Input,
  Label,
  Search,
  PopupMessage,
  P,
  ButtonWrapper,
  Button,
} from "../styles/Student.style";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import {
  getStudents,
  bannedStudent,
  activeStudent,
  deleteStudent,
} from "../actions/student";
import classes from "../styles/Student.module.css";

const Student = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);
  const { student, errors } = useSelector((state) => state.student);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents(10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage([]);

    for (let i = 1; i < student.totalPage + 1; i++) {
      setPage((prev) => [...prev, i]);
    }
  }, [student.totalPage]);

  useEffect(() => {
    dispatch(getStudents(pageSize, student?.currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

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
    await dispatch(getStudents(10, 1, value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(handleSearchText), []);

  const handlePagination = async (e, p) => {
    await dispatch(getStudents(pageSize, p));
  };

  const handlePagePrev = async (e, page) => {
    await dispatch(getStudents(pageSize, page - 1));
  };

  const handlePageNext = async (e, page) => {
    await dispatch(getStudents(pageSize, page + 1));
  };

  const handleBannedStudent = async (e, id) => {
    await dispatch(bannedStudent(id));

    setTimeout(async () => {
      await dispatch(getStudents(pageSize, student?.currentPage));
    }, 3000);
  };

  const handleDeleteStudent = async (e, id) => {
    await dispatch(deleteStudent(id));

    setTimeout(async () => {
      await dispatch(getStudents(pageSize, student?.currentPage));
    }, 3000);
  };

  const handleActiveStudent = async (e, id) => {
    await dispatch(activeStudent(id));

    setTimeout(async () => {
      await dispatch(getStudents(pageSize, student?.currentPage));
    }, 3000);
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            {student?.message && (
              <FlashMessage duration={5000} persistOnHover={true}>
                <P
                  style={{
                    color: student?.status
                      ? "#F7B217"
                      : student?.deleteStatus
                      ? "red"
                      : "green",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {student?.message}
                </P>
              </FlashMessage>
            )}
            {errors?.message && (
              <FlashMessage duration={5000} persistOnHover={true}>
                <P
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {errors?.message}
                </P>
              </FlashMessage>
            )}
            <Title>All Students Information</Title>
            <Search
              name="searchText"
              onChange={(e) => {
                optimizedFn(e.target.value);
              }}
              placeholder="Search student"
            />
            <StudentWrapper>
              <ViewStudentWrapper>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Present Address</Th>
                      <Th>Permanent Address</Th>
                      <Th>City</Th>
                      <Th>Country</Th>
                      <Th>Status</Th>
                      <Th>Is Ban</Th>
                      <Th>Profile</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {student?.students?.length
                      ? student.students.map((t) => (
                          <Tr key={t._id}>
                            <Td>{t.userId}</Td>
                            <Td>{t.name}</Td>
                            <Td>{t.email}</Td>
                            <Td>{t.phone}</Td>
                            <Td>{t.presentAddress}</Td>
                            <Td>{t.permanentAddress}</Td>
                            <Td>{t.city}</Td>
                            <Td>{t.country}</Td>
                            <Td
                              style={{
                                color:
                                  t.status === "active" ? "green" : "#F7B217",
                              }}
                            >
                              {t.status}
                            </Td>
                            <Td
                              style={{
                                color: t.isBan ? "#F7B217" : "green",
                              }}
                            >
                              {t.isBan ? "Yes" : "No"}
                            </Td>
                            <Td
                              style={{
                                color: t.isFirstLogin ? "#F7B217" : "green",
                              }}
                            >
                              {t.isFirstLogin ? "Obsolete" : "Updated"}
                            </Td>
                            <Td
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                              }}
                            >
                              {/* active student */}
                              <Popup
                                trigger={
                                  <Check
                                    style={{
                                      color:
                                        t.status === "active"
                                          ? "green"
                                          : "#F7B217",
                                      marginRight: "15px",
                                    }}
                                  />
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
                                    Are you sure you want to{" "}
                                    {t.status === "inactive"
                                      ? "active"
                                      : "inactive"}{" "}
                                    this student?
                                  </P>
                                  <ButtonWrapper>
                                    <Button
                                      style={{
                                        border: "1px solid #F7B217",
                                        color: "#F7B217",
                                      }}
                                      onClick={(e) =>
                                        handleActiveStudent(e, t._id)
                                      }
                                    >
                                      Confirm
                                    </Button>
                                  </ButtonWrapper>
                                </PopupMessage>
                              </Popup>
                              {/* banned student */}
                              <Popup
                                trigger={
                                  <Block
                                    style={{
                                      color: "#F7B217",
                                      marginRight: "15px",
                                    }}
                                  />
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
                                    Are you sure you want to{" "}
                                    {t.isBan ? "unban" : "ban"} this student?
                                  </P>
                                  <ButtonWrapper>
                                    <Button
                                      style={{
                                        border: "1px solid #F7B217",
                                        color: "#F7B217",
                                      }}
                                      onClick={(e) =>
                                        handleBannedStudent(e, t._id)
                                      }
                                    >
                                      Confirm
                                    </Button>
                                  </ButtonWrapper>
                                </PopupMessage>
                              </Popup>

                              {/* delete student */}
                              <Popup
                                trigger={
                                  <DeleteOutline style={{ color: "red" }} />
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
                                    Are you sure you want to delete this
                                    student?
                                  </P>
                                  <ButtonWrapper>
                                    <Button
                                      style={{
                                        border: "1px solid red",
                                        color: "red",
                                      }}
                                      onClick={(e) =>
                                        handleDeleteStudent(e, t._id)
                                      }
                                    >
                                      Confirm
                                    </Button>
                                  </ButtonWrapper>
                                </PopupMessage>
                              </Popup>
                            </Td>
                          </Tr>
                        ))
                      : null}
                  </Tbody>
                </Table>
              </ViewStudentWrapper>
            </StudentWrapper>
            <PaginationContainer>
              <PaginationWrapper>
                <Movement
                  disabled={student?.currentPage === 1 ? true : false}
                  onClick={(e) => handlePagePrev(e, student?.currentPage)}
                  className={student?.currentPage === 1 ? classes.Movement : ""}
                  type="submit"
                >
                  Prev
                </Movement>
              </PaginationWrapper>

              <PaginationWrapper>
                {page.map((p, i) => (
                  <PageNumber
                    key={i}
                    onClick={(e) => handlePagination(e, p)}
                    type="submit"
                    className={
                      student?.currentPage === p && classes.CurrentPage
                    }
                  >
                    {p}
                  </PageNumber>
                ))}
              </PaginationWrapper>

              <PaginationWrapper>
                <Movement
                  disabled={
                    student?.currentPage === student?.totalPage ? true : false
                  }
                  onClick={(e) => handlePageNext(e, student?.currentPage)}
                  className={
                    student?.currentPage === student?.totalPage
                      ? classes.Movement
                      : ""
                  }
                  type="submit"
                >
                  Next
                </Movement>
              </PaginationWrapper>

              <PaginationWrapper>
                <Label>Limit</Label>
                <Input
                  type="text"
                  name="pageSize"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                />
              </PaginationWrapper>
            </PaginationContainer>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default Student;
