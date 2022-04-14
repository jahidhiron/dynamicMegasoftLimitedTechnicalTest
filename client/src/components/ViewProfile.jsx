import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LeftBar from "./LeftBar";
import {
  Container,
  MainContent,
  ViewProfileWrapper,
  Table,
  Tr,
  Th,
  Td,
  Title,
  Thead,
  Tbody,
} from "../styles/Home.styles";
import ShowProfileFirstTime from "./ShowProfileFirstTime";
import { getUser } from "../actions/user";

const ViewProfile = () => {
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { style } = useSelector((state) => state.style);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(localStorageData?.user?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ShowProfileFirstTime />
      {localStorageData.user.isFirstLogin === false && (
        <>
          <LeftBar />
          <MainContent toggle={style.sidebar}>
            <Title>Your Information</Title>
            <ViewProfileWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Information</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>ID</Td>
                    <Td>{user?.userId}</Td>
                  </Tr>
                  <Tr>
                    <Td>Name</Td>
                    <Td>{user?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Email</Td>
                    <Td>{user?.email}</Td>
                  </Tr>
                  <Tr>
                    <Td>Phone</Td>
                    <Td>{user?.phone}</Td>
                  </Tr>
                  <Tr>
                    <Td>Present Address</Td>
                    <Td>{user?.presentAddress}</Td>
                  </Tr>
                  <Tr>
                    <Td>Permanent Address</Td>
                    <Td>{user?.permanentAddress}</Td>
                  </Tr>
                  <Tr>
                    <Td>City</Td>
                    <Td>{user?.city}</Td>
                  </Tr>
                  <Tr>
                    <Td>Country</Td>
                    <Td>{user?.country}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </ViewProfileWrapper>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default ViewProfile;
