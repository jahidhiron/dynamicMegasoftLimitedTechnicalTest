import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, Block } from "@material-ui/icons";

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
} from "../styles/Teacher.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import { getTeachers } from "../actions/teacher";
import classes from "../styles/Teacher.module.css";

const Teacher = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);
  const { teacher } = useSelector((state) => state.teacher);
  const [page, setPage] = useState([]);
  const [pageSize, setPageSize] = useState(10);
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

  const handlePagination = async (e, p) => {
    await dispatch(getTeachers(pageSize, p));
  };

  const handlePagePrev = async (e, page) => {
    await dispatch(getTeachers(pageSize, page - 1));
  };

  const handlePageNext = async (e, page) => {
    await dispatch(getTeachers(pageSize, page + 1));
  };

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            <Title>All Teachers Information</Title>
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
                    {teacher?.teachers?.length &&
                      teacher.teachers.map((t) => (
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
                          >
                            <Block
                              style={{ color: "#F7B217", marginRight: "15px" }}
                            />
                            <DeleteOutline style={{ color: "red" }} />
                          </Td>
                        </Tr>
                      ))}
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
