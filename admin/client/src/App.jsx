import LandingPage from "./Pages/Admin/LandingPage/LandingPage";
import Registration from "./Pages/Admin/Registration/Registration";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Admin/Login/Login";
import DashBoard from "./Pages/Admin/DashBoard/DashBoard";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import HomePage from "./Pages/Admin/HomePage/HomePage";
import Students from "./Pages/Admin/Students/Students";
import Staffs from "./Pages/Admin/Staffs/Staffs";
import Events from "./Pages/Admin/Events/Events";
import Settings from "./Pages/Admin/Settings/Settings";
import Posts from "./Pages/Admin/Posts/Posts";

const App = () => {
  const { isUserLogin, isUserRegistred } = useContext(AppContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isUserRegistred ? (
                isUserLogin ? (
                  <DashBoard />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <LandingPage /> // Stay on the root page if not registered
              )
            }
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {isUserLogin && (
            <>
              <Route
                path="/dashboard"
                element={isUserLogin ? <DashBoard /> : <Navigate to="/login" />}
              >
              <Route path="homepage" element={<HomePage/>}/>
              <Route path="students" element={<Students/>}/>
              <Route path="staffs" element={<Staffs/>}/>
              <Route path="events" element={<Events/>}/>
              <Route path="posts" element={<Posts/>}/>
              <Route path="settings" element={<Settings/>}/>
              </Route>
            </>
          )}

          {/* Optional fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer /> 
    </div>
  );
};

export default App;
