import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import UserControlPage from "./pages/UserControlPage"
import RetrievePassword from "./pages/RetrivePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-control" element={<UserControlPage />} />
        <Route path="/retrieve-password" element={<RetrievePassword />} />
      </Routes>
    </BrowserRouter>
  );
}
