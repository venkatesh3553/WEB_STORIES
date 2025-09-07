import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectRouter/ProtectRouter"
import AddStory from "./components/AddStory/AddStory";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addstore" element={<AddStory />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
