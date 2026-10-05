import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";

import retrievePassword from "../assets/retrievePasswordImage.svg";
import returnWithCircle from "../assets/returnWithCircle.svg";
import { usersApi } from "@/services/users.api";

export default function RetrievePassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRetrieve(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!email){
      setError("Preencha o email")
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await usersApi.resetPassword(email);

      setMessage(response.data.message);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Não foi possível redefinir a senha.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full h-screen bg-[#0d1931] items-center">
      <section className="flex flex-1 items-center justify-center">
        <img src={retrievePassword} className="w-100 h-100" />
      </section>

      <section className="flex flex-1 h-2/3">
        <form
          onSubmit={handleRetrieve}
          className="flex flex-col h-full max-w-md w-full p-5 bg-white border rounded"
        >
          <Logo textSize="4xl" invertColor={true} />

          <h1 className="text-xl text-[#0290A4] font-bold mt-8">
            Recuperação de senha
          </h1>

          <p>Insira seu e-mail para recuperar sua senha</p>

          <div className="relative">
            {email && (
              <span
                className={`absolute top-10 left-3 text-[10px] ${error && error.length > 0 ? "text-[#B00020]" : "text-[#0290A4]"}`}
              >E-mail</span>
            )}
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded p-3 focus:outline-none mt-8  
                ${email && email.length > 0 ? "pt-6 pb-2 border-b-2 border-[#0290A4]" : "border border-slate-200"}
                ${error && error.length > 0 ? "border-b-2 border-[#B00020]" : ""}
              `}
            />
          </div>

          {message && <p className="text-green-600 text-sm mt-3">{message}</p>}

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <button
            type="submit"
            disabled={email.length === 0 || loading}
            className="bg-[#0290A4] text-white text-md font-bold rounded p-2 cursor-pointer disabled:opacity-50 mt-6"
          >
            {loading ? "Recuperando..." : "Recuperar"}
          </button>

          <Link
            to="/"
            className="group flex items-center justify-center gap-2 w-full text-center mt-8 text-[#6F7D7D] hover:text-[#0290A4] text-sm"
          >
            <img
              src={returnWithCircle}
              className="brightness-0 opacity-40 group-hover:opacity-100 group-hover:brightness-100"
            />
            <span>Voltar para o login</span>
          </Link>
        </form>
      </section>
    </div>
  );
}
