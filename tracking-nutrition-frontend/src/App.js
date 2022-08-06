import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import FoodInTake from "./pages/FoodInTake";
import Report from "./pages/Report";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
// import { useEffect } from "react";
// import { UserAuth } from "./context/AuthContext";

function App() {
  // const { updateExistUser, existUser } = UserAuth();

  // useEffect(updateExistUser, []);
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/foodintake"
            element={
              <Protected>
                <FoodInTake />
              </Protected>
            }
          />
          <Route
            path="/report"
            element={
              <Protected>
                <Report />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
