import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  Delete,
} from "../styles/Teacher.styles";
import LeftBar from "../components/LeftBar";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import { getTeachers } from "../actions/teacher";

const Teacher = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { style } = useSelector((state) => state.style);
  const { teacher } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      <Th>First Login</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {teacher.length &&
                      teacher.map((t) => (
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
                              color: t.isBan ? "#a39505" : "green",
                              cursor: "pointer",
                            }}
                          >
                            {t.isBan ? "Yes" : "No"}
                          </Td>
                          <Td
                            style={{
                              color: t.isFirstLogin ? "#a39505" : "green",
                            }}
                          >
                            {t.isFirstLogin ? "Yes" : "No"}
                          </Td>
                          <Td style={{ cursor: "pointer" }}>Delete</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </ViewTeacherWrapper>
            </TeacherWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default Teacher;
