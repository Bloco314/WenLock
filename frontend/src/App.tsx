import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import UserControlPage from "./pages/UserControlPage";
import RetrievePassword from "./pages/RetrivePassword";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-control" element={<UserControlPage />} />
        <Route path="/retrieve-password" element={<RetrievePassword />} />
      </Routes>

      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          classNames: {
            toast: "!rounded-sm !border-none !text-white",
            success: "!bg-[#00C857]",
            error: "!bg-[#FF4B4A]",
            warning: "!bg-[#FF7700]",
            closeButton:
              "!static !translate-y-2 !ml-auto !order-last !text-white !bg-transparent !border-none [&>svg]:!w-5 [&>svg]:!h-5 [&>svg]:!stroke-[3]",
          },
        }}
      />
    </BrowserRouter>
  );
}
