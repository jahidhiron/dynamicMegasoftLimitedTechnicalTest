import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, Block } from "@material-ui/icons";
import FlashMessage from "react-flash-message";

import { Container, MainContent } from "../styles/Home.styles";
import {
  TeacherWrapper,
  ViewTeacherWrapper,
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
} from "../styles/Teacher.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import { getTeachers, bannedTeacher } from "../actions/teacher";
import classes from "../styles/Teacher.module.css";

const Teacher = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);
  const { teacher } = useSelector((state) => state.teacher);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers(10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage([]);

    for (let i = 1; i < teacher.totalPage + 1; i++) {
      setPage((prev) => [...prev, i]);
    }
  }, [teacher.totalPage]);

  useEffect(() => {
    dispatch(getTeachers(pageSize, teacher?.currentPage));
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
    await dispatch(getTeachers(10, 1, value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(handleSearchText), []);

  const handlePagination = async (e, p) => {
    await dispatch(getTeachers(pageSize, p));
  };

  const handlePagePrev = async (e, page) => {
    await dispatch(getTeachers(pageSize, page - 1));
  };

  const handlePageNext = async (e, page) => {
    await dispatch(getTeachers(pageSize, page + 1));
  };

  const handleBannedTeacher = async (e, id) => {
    await dispatch(bannedTeacher(id));

    setTimeout(async () => {
      await dispatch(getTeachers(pageSize, teacher?.currentPage));
    }, 3000);
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            {teacher?.message && (
              <FlashMessage duration={5000} persistOnHover={true}>
                <p
                  style={{
                    color: teacher?.status ? "#F7B217" : "green",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {teacher?.message}
                </p>
              </FlashMessage>
            )}
            <Title>All Teachers Information</Title>
            <Search
              name="searchText"
              onChange={(e) => {
                optimizedFn(e.target.value);
              }}
              placeholder="Search teacher"
            />
            <TeacherWrapper>
              <ViewTeacherWrapper>
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
                      <Th>Is Ban</Th>
                      <Th>Profile</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {teacher?.teachers?.length
                      ? teacher.teachers.map((t) => (
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
                              onClick={(e) => handleBannedTeacher(e, t._id)}
                            >
                              <Block
                                style={{
                                  color: "#F7B217",
                                  marginRight: "15px",
                                }}
                              />
                              <DeleteOutline style={{ color: "red" }} />
                            </Td>
                          </Tr>
                        ))
                      : null}
                  </Tbody>
                </Table>
              </ViewTeacherWrapper>
            </TeacherWrapper>
            <PaginationContainer>
              <PaginationWrapper>
                <Movement
                  disabled={teacher?.currentPage === 1 ? true : false}
                  onClick={(e) => handlePagePrev(e, teacher?.currentPage)}
                  className={teacher?.currentPage === 1 ? classes.Movement : ""}
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
                      teacher?.currentPage === p && classes.CurrentPage
                    }
                  >
                    {p}
                  </PageNumber>
                ))}
              </PaginationWrapper>

              <PaginationWrapper>
                <Movement
                  disabled={
                    teacher?.currentPage === teacher?.totalPage ? true : false
                  }
                  onClick={(e) => handlePageNext(e, teacher?.currentPage)}
                  className={
                    teacher?.currentPage === teacher?.totalPage
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

export default Teacher;
