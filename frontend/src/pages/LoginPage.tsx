import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { errorToast, successToast } from "@/utils/toast.utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, loading, error } = useUserStore();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({
        email,
        password,
      });

      successToast("Usuário logado com sucesso!");
      navigate("/home");
    } catch {
      errorToast("Usuário/Senha inválido(a)")
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0d1931] items-center">
      <section className="flex flex-1 items-center justify-center ml-10">
        <Logo textSize="8xl" />
      </section>

      <section className="flex flex-1">
        <form
          onSubmit={handleLogin}
          className="flex flex-col max-w-md w-full p-10 bg-white border rounded"
        >
          <h1 className="text-4xl text-[#0290A4] font-bold">Bem-vindo!</h1>

          <p className="text-[#0B2B25] mt-6 mb-4">Entre com sua conta</p>

          <div className="mb-4">
            <Input
              label="E-mail ou N°matrícula"
              value={email}
              onChange={setEmail}
              error={!!error}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Senha"
              value={password}
              onChange={setPassword}
              type="password"
              error={!!error}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0290A4] text-white font-bold rounded p-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <Link
            to="/retrieve-password"
            className="text-[#0290A4] text-center font-bold cursor-pointer hover:text-[#00606D] text-sm mt-4"
          >
            Esqueci minha senha
          </Link>
        </form>
      </section>
    </div>
  );
}
