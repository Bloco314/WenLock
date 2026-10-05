import { Logo } from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import pizzaSlice from "../assets/pizza_slice.png";
import usersIcon from "../assets/users.png";
import arrowDown from "../assets/arrowDown.png";
import arrowUp from "../assets/arrowUp.png";
import arrowRight from "../assets/arrowRight.png";
import arrowLeft from "../assets/arrowLeft.png";
import profile from "../assets/profile.png";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(true);
  const [showOptions, setShowOptions] = useState(isActive("/user-control"));

  return (
    <div
      className={`flex flex-col bg-[#0d1931] h-screen border-none shadow-[1px_1px_1px_1px_grey] transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      <header className="flex justify-center p-2 mt-4 relative">
        <Logo textSize="4xl" isOpen={isOpen} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-full h-7 w-7 bg-[#F2F2F2] cursor-pointer absolute bottom-2 -right-4"
        >
          <span className="flex items-center justify-center">
            <img
              src={isOpen ? arrowLeft : arrowRight}
              className="h-4 w-4 flex items-center justify-center"
            />
          </span>
        </button>
      </header>

      <button
        onClick={() => navigate("/home")}
        className={`flex items-center gap-2 p-2 m-2 text-left rounded ${
          isActive("/home")
            ? "bg-[#00AAC1] text-[#021B1A] font-bold"
            : "text-white cursor-pointer"
        }`}
      >
        <img
          src={pizzaSlice}
          className={`w-5 h-5 ${
            isActive("/home") ? "brightness-0" : "brightness-0 invert"
          }`}
        />
        {isOpen && <span>Home</span>}
      </button>

      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 p-2 m-2 text-left rounded text-white cursor-pointer"
      >
        <img src={usersIcon} className="w-5 h-5" />
        {isOpen && <span>Controle de acesso</span>}
        <img src={showOptions ? arrowDown : arrowUp} />
      </button>

      {showOptions && (
        <button
          className={`flex items-center gap-2 p-2 text-left rounded ${
            isActive("/user-control")
              ? "bg-[#00AAC1] text-[#021B1A] font-bold"
              : "text-white cursor-pointer"
          } ${isOpen ? "mx-6" : "mx-4"}`}
          onClick={() => navigate("/user-control")}
        >
          <img
            src={profile}
            className={`w-5 h-5 ${
              isActive("/user-control") ? "brightness-0" : "brightness-0 invert"
            }`}
          />
          {isOpen && <span>Usuários</span>}
        </button>
      )}

      <footer className="flex flex-col mt-auto mb-8 mx-4">
        {isOpen && (
          <span className="text-white font-bold text-lg">© WenLock</span>
        )}
        {isOpen && <span className="text-[#AACBC4]">Power by Connecthus</span>}
        <span className="text-[#AACBC4]">V 0.0.0</span>
      </footer>
    </div>
  );
}
