import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LeftBar from "./LeftBar";
import { Container, MainContent } from "../styles/Home.styles";
import {
  DashboardWrapper,
  DashboardWrapperTop,
  DashboardWrapperMiddle,
  DashboardWrapperBottom,
  DashboardWrapperLeft,
  DashboardWrapperRight,
  Wrapper,
  ViewWrapper,
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
} from "../styles/Dashboard.styles";
import {
  getRecentTeachers,
  getUnprofileTeachers,
  getBanTeachers,
} from "../actions/teacher";
import {
  getRecentStudents,
  getUnprofileStudents,
  getBanStudents,
} from "../actions/student";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import classes from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));

  // teacher
  const [teacherUnprofilePageSize, setTeacherUnprofilePageSize] = useState(10);
  const [teacherBanPageSize, setTeacherBanPageSize] = useState(10);
  const [teacherUnprofilePage, setTeacherUnprofilePage] = useState([]);
  const [teacherBanPage, setTeacherBanPage] = useState([]);

  // student
  const [studentUnprofilePageSize, setStudentUnprofilePageSize] = useState(10);
  const [studentBanPageSize, setStudentBanPageSize] = useState(10);
  const [studentUnprofilePage, setStudentUnprofilePage] = useState([]);
  const [studentBanPage, setStudentBanPage] = useState([]);

  const { style } = useSelector((state) => state.style);
  const teacher = useSelector((state) => state.teacher);
  const student = useSelector((state) => state.student);
  const dispatch = useDispatch();

  // after first load
  useEffect(() => {
    // teacher
    dispatch(getRecentTeachers());
    dispatch(getUnprofileTeachers(10, 1));
    dispatch(getBanTeachers(10, 1));

    // student
    dispatch(getRecentStudents());
    dispatch(getUnprofileStudents(10, 1));
    dispatch(getBanStudents(10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =============== teacher ===================

  // after page load
  // teacher
  useEffect(() => {
    dispatch(
      getUnprofileTeachers(
        teacherUnprofilePageSize,
        teacher?.unprofileTeacher?.currentPage
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherUnprofilePageSize]);

  useEffect(() => {
    dispatch(
      getBanTeachers(teacherBanPageSize, teacher?.banTeacher?.currentPage)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherBanPageSize]);

  // =============== student ===================

  // student
  useEffect(() => {
    dispatch(
      getUnprofileStudents(
        studentUnprofilePageSize,
        student?.unprofileStudent?.currentPage
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentUnprofilePageSize]);

  useEffect(() => {
    dispatch(
      getBanStudents(studentBanPageSize, student?.banStudent?.currentPage)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentBanPageSize]);

  // teacher
  useEffect(() => {
    setTeacherUnprofilePage([]);

    for (let i = 1; i < teacher?.unprofileTeacher?.totalPage + 1; i++) {
      setTeacherUnprofilePage((prev) => [...prev, i]);
    }
  }, [teacher?.unprofileTeacher?.totalPage]);

  useEffect(() => {
    setTeacherBanPage([]);

    for (let i = 1; i < teacher?.banTeacher?.totalPage + 1; i++) {
      setTeacherBanPage((prev) => [...prev, i]);
    }
  }, [teacher?.banTeacher?.totalPage]);

  // student
  useEffect(() => {
    setStudentUnprofilePage([]);

    for (let i = 1; i < student?.unprofileStudent?.totalPage + 1; i++) {
      setStudentUnprofilePage((prev) => [...prev, i]);
    }
  }, [student?.unprofileStudent?.totalPage]);

  useEffect(() => {
    setStudentBanPage([]);

    for (let i = 1; i < student?.banStudent?.totalPage + 1; i++) {
      setStudentBanPage((prev) => [...prev, i]);
    }
  }, [student?.banStudent?.totalPage]);

  // teacher unprofile prev and next
  const handleTeacherUnprofilePrev = async (e, page) => {
    await dispatch(getUnprofileTeachers(teacherUnprofilePageSize, page - 1));
  };

  const handleTeacherUnprofileNext = async (e, page) => {
    await dispatch(getUnprofileTeachers(teacherUnprofilePageSize, page + 1));
  };

  // teacher ban prev and next
  const handleTeacherBanPrev = async (e, page) => {
    await dispatch(getBanTeachers(teacherBanPageSize, page - 1));
  };

  const handleTeacherBanNext = async (e, page) => {
    await dispatch(getBanTeachers(teacherBanPageSize, page + 1));
  };

  // student unprofile prev and next
  const handleStudentUnprofilePrev = async (e, page) => {
    await dispatch(getUnprofileStudents(studentUnprofilePageSize, page - 1));
  };

  const handleStudentUnprofileNext = async (e, page) => {
    await dispatch(getUnprofileStudents(studentUnprofilePageSize, page + 1));
  };

  // student ban prev and next
  const handleStudentBanPrev = async (e, page) => {
    await dispatch(getBanStudents(studentBanPageSize, page - 1));
  };

  const handleStudentBanNext = async (e, page) => {
    await dispatch(getBanStudents(studentBanPageSize, page + 1));
  };

  // teacher movement
  const handleTeacherUnprofilePagination = async (e, p) => {
    await dispatch(getUnprofileTeachers(teacherUnprofilePageSize, p));
  };

  const handleTeacherBanPagination = async (e, p) => {
    await dispatch(getBanTeachers(teacherBanPageSize, p));
  };

  // student movement
  const handleStudentUnprofilePagination = async (e, p) => {
    await dispatch(getUnprofileStudents(studentUnprofilePageSize, p));
  };

  const handleStudentBanPagination = async (e, p) => {
    await dispatch(getBanStudents(studentBanPageSize, p));
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            <DashboardWrapper>
              {/* recently add user */}
              <DashboardWrapperTop>
                {/* recently add teacher */}
                <DashboardWrapperLeft>
                  <Wrapper>
                    <Title>Recently Add Teachers</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {teacher?.recentTeacher?.length
                            ? teacher.recentTeacher.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>
                </DashboardWrapperLeft>

                {/* recently add student */}
                <DashboardWrapperRight>
                  <Wrapper>
                    <Title>Recently Add Students</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {student?.recentStudent?.length
                            ? student.recentStudent.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>
                </DashboardWrapperRight>
              </DashboardWrapperTop>

              {/* unprofile user */}
              <DashboardWrapperMiddle>
                {/* unprofile teacher */}
                <DashboardWrapperLeft style={{ flexDirection: "column" }}>
                  <Wrapper>
                    <Title>Unprofile Teachers</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {teacher?.unprofileTeacher?.teachers?.length
                            ? teacher.unprofileTeacher?.teachers?.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>

                  {/* unprofile teacher pagination */}
                  <PaginationContainer>
                    <PaginationWrapper>
                      <Movement
                        disabled={
                          teacher?.unprofileTeacher?.currentPage === 1
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleTeacherUnprofilePrev(
                            e,
                            teacher?.unprofileTeacher?.currentPage
                          )
                        }
                        className={
                          teacher?.unprofileTeacher?.currentPage === 1
                            ? classes.Movement
                            : ""
                        }
                        type="submit"
                      >
                        Prev
                      </Movement>
                    </PaginationWrapper>

                    <PaginationWrapper>
                      {teacherUnprofilePage.map((p, i) => (
                        <PageNumber
                          key={i}
                          onClick={(e) =>
                            handleTeacherUnprofilePagination(e, p)
                          }
                          type="submit"
                          className={
                            teacher?.unprofileTeacher?.currentPage === p &&
                            classes.CurrentPage
                          }
                        >
                          {p}
                        </PageNumber>
                      ))}
                    </PaginationWrapper>

                    <PaginationWrapper>
                      <Movement
                        disabled={
                          teacher?.unprofileTeacher?.currentPage ===
                          teacher?.unprofileTeacher?.totalPage
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleTeacherUnprofileNext(
                            e,
                            teacher?.unprofileTeacher?.currentPage
                          )
                        }
                        className={
                          teacher?.unprofileTeacher?.currentPage ===
                          teacher?.unprofileTeacher?.totalPage
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
                        value={teacherUnprofilePageSize}
                        onChange={(e) =>
                          setTeacherUnprofilePageSize(e.target.value)
                        }
                      />
                    </PaginationWrapper>
                  </PaginationContainer>
                </DashboardWrapperLeft>

                {/* unprofile student */}
                <DashboardWrapperRight style={{ flexDirection: "column" }}>
                  <Wrapper>
                    <Title>Unprofile Student</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {student?.unprofileStudent?.students?.length
                            ? student.unprofileStudent?.students?.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>

                  {/* unprofile student pagination */}
                  <PaginationContainer>
                    <PaginationWrapper>
                      <Movement
                        disabled={
                          student?.unprofileStudent?.currentPage === 1
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleStudentUnprofilePrev(
                            e,
                            student?.unprofileStudent?.currentPage
                          )
                        }
                        className={
                          student?.unprofileStudent?.currentPage === 1
                            ? classes.Movement
                            : ""
                        }
                        type="submit"
                      >
                        Prev
                      </Movement>
                    </PaginationWrapper>

                    <PaginationWrapper>
                      {studentUnprofilePage.map((p, i) => (
                        <PageNumber
                          key={i}
                          onClick={(e) =>
                            handleStudentUnprofilePagination(e, p)
                          }
                          type="submit"
                          className={
                            student?.unprofileStudent?.currentPage === p &&
                            classes.CurrentPage
                          }
                        >
                          {p}
                        </PageNumber>
                      ))}
                    </PaginationWrapper>

                    <PaginationWrapper>
                      <Movement
                        disabled={
                          student?.unprofileStudent?.currentPage ===
                          student?.unprofileStudent?.totalPage
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleStudentUnprofileNext(
                            e,
                            student?.unprofileStudent?.currentPage
                          )
                        }
                        className={
                          student?.unprofileStudent?.currentPage ===
                          student?.unprofileStudent?.totalPage
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
                        value={studentUnprofilePageSize}
                        onChange={(e) =>
                          setStudentUnprofilePageSize(e.target.value)
                        }
                      />
                    </PaginationWrapper>
                  </PaginationContainer>
                </DashboardWrapperRight>
              </DashboardWrapperMiddle>

              {/* ban user */}
              <DashboardWrapperBottom>
                {/* ban teacher */}
                <DashboardWrapperLeft style={{ flexDirection: "column" }}>
                  <Wrapper>
                    <Title>Ban Teacher</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {teacher?.banTeacher?.teachers?.length
                            ? teacher.banTeacher?.teachers?.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.userId}</Td>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>

                  {/* ban teacher pagination */}
                  <PaginationContainer>
                    <PaginationWrapper>
                      <Movement
                        disabled={
                          teacher?.banTeacher?.currentPage === 1 ? true : false
                        }
                        onClick={(e) =>
                          handleTeacherBanPrev(
                            e,
                            teacher?.banTeacher?.currentPage
                          )
                        }
                        className={
                          teacher?.banTeacher?.currentPage === 1
                            ? classes.Movement
                            : ""
                        }
                        type="submit"
                      >
                        Prev
                      </Movement>
                    </PaginationWrapper>

                    <PaginationWrapper>
                      {teacherBanPage.map((p, i) => (
                        <PageNumber
                          key={i}
                          onClick={(e) => handleTeacherBanPagination(e, p)}
                          type="submit"
                          className={
                            teacher?.banTeacher?.currentPage === p &&
                            classes.CurrentPage
                          }
                        >
                          {p}
                        </PageNumber>
                      ))}
                    </PaginationWrapper>

                    <PaginationWrapper>
                      <Movement
                        disabled={
                          teacher?.banTeacher?.currentPage ===
                          teacher?.banTeacher?.totalPage
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleTeacherBanNext(
                            e,
                            teacher?.banTeacher?.currentPage
                          )
                        }
                        className={
                          teacher?.banTeacher?.currentPage ===
                          teacher?.banTeacher?.totalPage
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
                        value={teacherBanPageSize}
                        onChange={(e) => setTeacherBanPageSize(e.target.value)}
                      />
                    </PaginationWrapper>
                  </PaginationContainer>
                </DashboardWrapperLeft>

                {/* ban student */}
                <DashboardWrapperRight style={{ flexDirection: "column" }}>
                  <Wrapper>
                    <Title>Ban Student</Title>
                    <ViewWrapper>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {student?.banStudent?.students?.length
                            ? student.banStudent?.students?.map((t) => (
                                <Tr key={t._id}>
                                  <Td>{t.userId}</Td>
                                  <Td>{t.name}</Td>
                                  <Td>{t.email}</Td>
                                </Tr>
                              ))
                            : null}
                        </Tbody>
                      </Table>
                    </ViewWrapper>
                  </Wrapper>

                  {/* ban student pagination */}
                  <PaginationContainer>
                    <PaginationWrapper>
                      <Movement
                        disabled={
                          student?.banStudent?.currentPage === 1 ? true : false
                        }
                        onClick={(e) =>
                          handleStudentBanPrev(
                            e,
                            student?.banStudent?.currentPage
                          )
                        }
                        className={
                          student?.banStudent?.currentPage === 1
                            ? classes.Movement
                            : ""
                        }
                        type="submit"
                      >
                        Prev
                      </Movement>
                    </PaginationWrapper>

                    <PaginationWrapper>
                      {studentBanPage.map((p, i) => (
                        <PageNumber
                          key={i}
                          onClick={(e) => handleStudentBanPagination(e, p)}
                          type="submit"
                          className={
                            student?.banStudent?.currentPage === p &&
                            classes.CurrentPage
                          }
                        >
                          {p}
                        </PageNumber>
                      ))}
                    </PaginationWrapper>

                    <PaginationWrapper>
                      <Movement
                        disabled={
                          student?.banStudent?.currentPage ===
                          student?.banStudent?.totalPage
                            ? true
                            : false
                        }
                        onClick={(e) =>
                          handleStudentBanNext(
                            e,
                            student?.banStudent?.currentPage
                          )
                        }
                        className={
                          student?.banStudent?.currentPage ===
                          student?.banStudent?.totalPage
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
                        value={studentBanPageSize}
                        onChange={(e) => setStudentBanPageSize(e.target.value)}
                      />
                    </PaginationWrapper>
                  </PaginationContainer>
                </DashboardWrapperRight>
              </DashboardWrapperBottom>
            </DashboardWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
