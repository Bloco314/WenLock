import { useUserStore } from "@/stores/user.store";
import exitDoor from "../assets/exitDoor.png";
import { useNavigate } from "react-router-dom";
import openClose from "../assets/open_close.svg"

export default function TopBar() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function getInitials(name: string): string {
    if (name.length == 0) {
      return "A";
    }
    const names = name.trim().split(/\s+/);

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  function ProfileCard() {
    return (
      <div className="flex flex-col rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-black w-9 h-9">
            <span className="text-white">{getInitials(user?.name ?? "")}</span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-md text-[#0290A4] font-bold">
              {user?.name}
            </span>
            <span className="text-sm text-[#0B2B25] opacity-80">
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex gap-2 text-left text-md mt-4 cursor-pointer"
        >
          <img src={exitDoor} />
          <p className="text-[#0B2B25]">Sair</p>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end ml-1 mr-0 h-17 bg-white">
      <div className="border border-2 border-[#00AAC1] flex items-center justify-center rounded-full bg-black w-10 h-10 mr-8 group relative">
        <span className="text-white">{getInitials(user?.name ?? "")}</span>

        <div className="w-6.5 h-6.5 absolute z-50 -right-2.5 -bottom-2.5 rounded-full flex items-center justify-center">
          <img
            src={openClose}
            className="transition-transform duration-100 group-hover:rotate-180 w-6.5 h-6.5"
          />
        </div>

        <div className="absolute top-full right-1 hidden group-hover:block">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
