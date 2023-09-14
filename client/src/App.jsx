import "./App.css";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import UserPage from "./components/UserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/homeAdmin" element={<HomePage />}></Route>
        <Route path="/userPage" element={<UserPage />}></Route>
        <Route path="/" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
