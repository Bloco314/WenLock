import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import homeImageLarge from "../assets/homeImageLarge.png";
import { useUserStore } from "@/stores/user.store";

export default function HomePage() {
  const { user } = useUserStore();

  function getTodayDateFormatted() {
    const date = new Date();

    const day = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
    });

    const formattedDate = `${day}, ${date
      .toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })
      .replace(" de ", " ")}`;

    return formattedDate;
  }

  return (
    <div className="flex flex-row bg-[#F3F3F3]">
      <Sidebar />

      <div className="flex-1">
        <TopBar />

        <h1 className="text-2xl font-bold mt-4 ml-8">Home</h1>

        <section className="bg-white rounded-sm border-slate-400 m-8 mt-4 p-2 pb-10 flex flex-col items-center justify-center">
          <div className="flex flex-col justify-left w-full ml-10 mt-4">
            <span className="text-left text-[#0D1931] text-2xl font-bold">
              Olá {user?.name}!
            </span>
            <span className="text-[#0D1931]">{getTodayDateFormatted()}</span>
          </div>
          <img src={homeImageLarge} className="w-100 h-80" />
          <div className="flex justify-center border border-slate-500 rounded-lg w-110 px-8 py-4 m-2 mt-4 font-bold text-[#0B2B25] text-xl">
            Bem-vindo ao WenLock!
          </div>
        </section>
      </div>
    </div>
  );
}
