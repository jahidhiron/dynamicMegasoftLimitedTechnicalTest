import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import GlobalStyle from "./styles/Global.styles";
import Join from "./pages/Join";
import Navbar from "./components/Navbar";
import PrivateOutlet from "./components/PrivateOutlet";
import Dashboard from "../src/components/Dashboard";
import Teacher from "../src/components/Teacher";
import Student from "../src/components/Student";
import ViewProfile from "../src/components/ViewProfile";
import UpdateProfile from "../src/components/UpdateProfile";
import ChangePassword from "../src/components/ChangePassword";

// root component
function App() {
  const { isSuccess } = useSelector((state) => state.auth);
  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    if (isSuccess) {
      setLocalStorageData(JSON.parse(localStorage.getItem("profile")));
    }
  }, [isSuccess]);

  return (
    <>
      <GlobalStyle />

      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            localStorageData ? <Navigate to="/dashboard" /> : <Landing />
          }
        />

        <Route
          path="/login"
          element={localStorageData ? <Navigate to="/dashboard" /> : <Join />}
        />

        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teacher" element={<Teacher />} />
          <Route path="student" element={<Student />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="view-profile" element={<ViewProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
