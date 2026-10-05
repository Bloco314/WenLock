import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Input } from "@/components/Input";
import { usersApi } from "@/services/users.api";
import { UpdateUserPayload, User } from "@/types";
import { useEffect, useState } from "react";
import {
  isValidName,
  isValidEmail,
  isValidRegistration,
  isValidPassword,
} from "@/utils/validation.utils";

import EditIcon from "../assets/edit.svg";
import EyeIcon from "../assets/eye.svg";
import EyeSlashIcon from "../assets/eye_slash.svg";
import TrashIcon from "../assets/trash.svg";
import PlusIcon from "../assets/plus.svg";
import SearchIcon from "../assets/search.svg";
import arrowRight from "../assets/arrowRight.png";
import arrowLeft from "../assets/arrowLeft.png";
import returnIcon from "../assets/returnArrow.svg";
import skipBack from "../assets/skipBack.svg";
import skipForward from "../assets/skipForward.svg";
import xIcon from "../assets/x.svg";
import emptySearch from "../assets/emptySearchImage.svg";
import { errorToast, successToast, warningToast } from "@/utils/toast.utils";

type pageMode = "LISTING" | "CREATING" | "EDITING" | "LISTING_SEARCH";

export default function UserControlPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<pageMode>("LISTING");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  // users data
  const [users, setUsers] = useState<User[]>([]);

  // search
  const [textSearch, setSearchText] = useState<string>("");

  // pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // creating
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // editing
  const [userEditInfo, setUserEditInfo] = useState<User>({
    name: "",
    email: "",
    registration: "",
    id: 0,
  });

  // visualizing
  const [displayUser, setDisplayUser] = useState<User>();

  async function loadUsers(
    currentMode = mode,
    currentPage = page,
    currentSearch = textSearch,
  ) {
    try {
      setLoading(true);

      const response =
        currentMode === "LISTING_SEARCH"
          ? await usersApi.getPaginatedSearch(currentSearch, currentPage, 15)
          : await usersApi.getPaginated(currentPage, 15);

      setUsers(response.data.data);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mode === "LISTING" || mode === "LISTING_SEARCH") {
      loadUsers();
    }
  }, [page, mode]);

  function isCreateFormValid(): boolean {
    return (
      name.trim() !== "" &&
      isValidName(name) &&
      email.trim() !== "" &&
      isValidEmail(email) &&
      registration.trim() !== "" &&
      isValidRegistration(registration) &&
      password !== "" &&
      isValidPassword(password) &&
      repeatPassword !== "" &&
      password === repeatPassword
    );
  }

  function isEditFormValid(): boolean {
    return (
      userEditInfo.name.trim() !== "" &&
      isValidName(userEditInfo.name) &&
      userEditInfo.email.trim() !== "" &&
      isValidEmail(userEditInfo.email) &&
      userEditInfo.registration.trim() !== "" &&
      isValidRegistration(userEditInfo.registration) &&
      isValidPassword(password) &&
      isValidPassword(repeatPassword) &&
      password === repeatPassword
    );
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (isCreateFormValid()) {
      setError("Formulario invalido.");
      return;
    }

    try {
      setLoading(true);

      await usersApi.create({
        name,
        registration,
        email,
        password,
      });

      successToast("Cadastro Realizado!");
      setMode("LISTING");
    } catch (error) {
      errorToast("Erro ao cadastrar usuário:" + error);
      setError("Não foi possível cadastrar o usuário.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(user: User) {
    try {
      await usersApi.delete(user.id);
      successToast("Exclusão Realizada!");
      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== user.id),
      );
    } catch (error) {
      errorToast("Erro ao excluir usuário:" + error);
    }
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();

    if (isCreateFormValid()) {
      setError("Formulario invalido.");
      return;
    }

    try {
      if (!userEditInfo) return;
      const payload: UpdateUserPayload = {
        email: userEditInfo.email,
        name: userEditInfo.name,
        registration: userEditInfo.registration,
        password: password,
      };

      await usersApi.update(userEditInfo.id, payload);

      successToast("Dados salvos com sucesso!");
      setMode("LISTING");
    } catch (error) {
      errorToast("Erro ao atualizar usuário:" + error);
    }
  }

  async function handleSearch() {
    setPage(1);
    setMode("LISTING_SEARCH");

    await loadUsers("LISTING_SEARCH", 1, textSearch);
  }

  function handleCleanSearch() {
    setSearchText("");
    setPage(1);
    setMode("LISTING");
  }

  function onEditClick(user: User) {
    setUserEditInfo(user);
    setMode("EDITING");
  }

  function showData(): boolean {
    return !loading && users.length > 0;
  }

  function userCard(user: User) {
    const buttonClassName =
      "p-2 border-none shadow-[0_1px_4px_rgba(0,0,0,0.15)] cursor-pointer rounded-md hover:bg-[#0290A4] group";
    return (
      <div className="flex items-center justify-left w-full p-2">
        <span className="ml-2">{user.name}</span>

        <div className="flex items-center justify-center ml-auto mr-4 gap-2">
          <button
            onClick={() => {
              (setShowDetailsModal(true), setDisplayUser(user));
            }}
            className={buttonClassName}
          >
            <img
              src={EyeIcon}
              alt="Details"
              className="group-hover:invert group-hover:brightness-0"
            />
          </button>

          <button onClick={() => onEditClick(user)} className={buttonClassName}>
            <img
              src={EditIcon}
              alt="Edit"
              className="group-hover:invert group-hover:brightness-0"
            />
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            className={buttonClassName}
          >
            <img
              src={TrashIcon}
              alt="Delete"
              className="group-hover:invert group-hover:brightness-0"
            />
          </button>
        </div>

        {showConfirmModal &&
          ConfirmModal("Deseja?", "Os dados inseridos não serão salvos", () =>
            handleDelete(user),
          )}

        {showDetailsModal && DetailsModal(displayUser!)}
      </div>
    );
  }

  function formatDate(date: string): string {
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString("pt-BR");
  }

  function DetailsModal(user: User) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
        <div className="flex flex-col w-full max-w-sm rounded-lg bg-white gap-4 p-6 shadow-xl   animate-[slideIn_0.3s_ease-out]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl text-[#0B2B25] font-bold">
              Visualizar Usuário
            </h1>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="text-2xl text-slate-600 cursor-pointer"
            >
              x
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#0B2B25] font-bold">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Dados do Usuário
            </span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[#0B2B25] opacity-80">Nome</span>
              <span>{user.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0B2B25] opacity-80">Matrícula</span>
              <span>{user.registration}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#0B2B25] opacity-80">E-mail</span>
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Detalhes
            </span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[#0B2B25] opacity-80">Data de criação</span>
              <span>{formatDate(user.createdAt ?? "")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0B2B25] opacity-80">Última edição</span>
              <span>{formatDate(user.updatedAt ?? "")}</span>
            </div>
          </div>

          <button
            onClick={() => setShowDetailsModal(false)}
            className="flex w-20 justify-center mt-auto mb-5 mx-auto py-2 px-16 rounded-md border hover:bg-[#00606D40] cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  function ConfirmModal(
    titleText: string,
    message: string,
    action: () => void,
  ) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="flex flex-col justify-center items-center w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-[#0B2B25]">{titleText}</h2>

          <p className="mt-2 text-sm text-gray-500">{message}</p>

          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="rounded-md px-7 py-2 font-semibold border text-gray-600 hover:bg-[#00606D40] hover:border-[#0B2B25]"
            >
              Não
            </button>

            <button
              type="button"
              onClick={() => {
                setShowConfirmModal(false);
                action();
              }}
              className="rounded-md bg-[#0290A4] px-7 py-2 font-semibold text-white hover:bg-[#00606D]"
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    );
  }

  function paginatedButtons() {
    return (
      <div className="flex items-center justify-between">
        <span>
          Total de itens: <strong>{total}</strong>
        </span>

        <div className="flex items-center gap-4">
          <span>Itens por página 15</span>

          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="px-1 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            <img src={skipBack} alt="" />
          </button>

          <button
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className="px-1 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            <img src={arrowLeft} alt="" />
          </button>

          <span>{page}</span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((current) => current + 1)}
            className="px-1 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            <img src={arrowRight} alt="" />
          </button>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(totalPages)}
            className="px-1 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            <img src={skipForward} alt="" />
          </button>

          <span>de {totalPages}</span>
        </div>
      </div>
    );
  }

  function userList() {
    return (
      <div className="flex flex-col h-[calc(100vh-4.25rem)]">
        <h1 className="text-2xl font-bold mt-2 ml-8">Usuários</h1>

        <div className="flex justify-between items-center mx-8 mt-2">
          <div
            className={`flex items-center gap-2 rounded-md p-4
              border bg-white shadow-[0px_3px_5px_0px] shadow-[#00000029] 
              ${
                textSearch.length > 0
                  ? "border-[#00AAC1] hover:border-[#00AAC1]"
                  : "border-white hover:border-[#868686FC] hover:bg-[#E3E3E3]"
              }
            `}
          >
            <button onClick={() => handleSearch()}>
              <img src={SearchIcon} alt="" />
            </button>

            <input
              value={textSearch}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Pesquisa"
              className="outline-none"
            />

            <button onClick={() => handleCleanSearch()}>
              <img src={xIcon} alt="" />
            </button>
          </div>

          <button
            onClick={() => {
              setMode("CREATING");
            }}
            className="flex items-center gap-2 text-white bg-[#0290A4] py-4 px-6 rounded-md cursor-pointer"
          >
            <img src={PlusIcon} alt="+" className="w-5 h-5" />

            <span>Cadastrar usuario</span>
          </button>
        </div>

        {(showData() || (!showData() && mode === "LISTING_SEARCH")) && (
          <div className="flex justify-between mx-8 mt-4 mb-3 bg-[#0D1931] text-white rounded-md p-3">
            <span>Nome</span>

            <span className="mr-20">Ações</span>
          </div>
        )}

        {showData() && (
          <section
            className="bg-white rounded-sm border-slate-400 m-8 mt-1 p-2 
          flex flex-col items-center justify-center shadow-[0px_3px_5px_0px] shadow-[#00000029]"
          >
            {users.map((user) => userCard(user))}
          </section>
        )}

        {!showData() && mode === "LISTING" && (
          <section className="bg-white h-full rounded-sm border-slate-400 mx-8 mt-2 p-2 flex flex-col items-center justify-center">
            <h1 className="text-[#0B2B25] text-xl font-bold">
              Nenhum usuário registrado
            </h1>
            <p className="text-[#0B2B25]">
              Clique em "Cadastrar Usuário" para começar a cadastrar
            </p>
          </section>
        )}

        {!showData() && mode === "LISTING_SEARCH" && (
          <section className="bg-white h-full rounded-sm border-slate-400 mx-8 mt-2 p-2 flex flex-col items-center justify-center">
            <img src={emptySearch} alt="" />
            <h1 className="text-[#0B2B25] text-xl font-bold">
              Nenhum Resultado Encontrado
            </h1>
            <p className="text-[#0B2B25] w-110 text-center">
              Não foi possível achar nenhum resultado para sua busca. Tente
              refazer a pesquisa para encontrar o que busca.
            </p>
          </section>
        )}

        <footer className="mx-8 mt-auto mb-4">{paginatedButtons()}</footer>
      </div>
    );
  }

  function userCreation() {
    return (
      <div className="ml-1 px-8 py-2">
        <div className="flex items-center text-xs text-slate-500 mb-2">
          <span>Usuários</span>
          <span className="mx-2">
            <img src={arrowRight} alt=">" className="w-2 h-2" />
          </span>
          <span>Cadastro de Usuário</span>
        </div>

        <div className="flex flex-row items-center gap-2 mb-4">
          <button
            onClick={() => {
              setMode("LISTING");
            }}
          >
            <img
              src={returnIcon}
              alt="<"
              className="mt-1 cursor-pointer w-5 h-5"
            />
          </button>

          <h1 className="text-3xl font-semibold text-[#0B2B25]">
            Cadastro de Usuário
          </h1>
        </div>

        <form
          onSubmit={handleCreateUser}
          className="w-full bg-white rounded-md border border-slate-200 shadow-sm px-4 py-4"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Dados do Usuário
            </span>

            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Input
                label="Nome completo"
                value={name}
                onChange={(value) => {
                  if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                    setName(value);
                  }
                }}
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Máx. 30 Caracteres
              </p>
            </div>

            <div>
              <Input
                label="Nº da matrícula"
                value={registration}
                onChange={(value) => {
                  if (/^\d*$/.test(value)) {
                    setRegistration(value);
                  }
                }}
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Mín. 4 Letras | * Máx. 10 Caracteres
              </p>
            </div>

            <div>
              <Input
                label="E-mail"
                value={email}
                onChange={setEmail}
                type="text"
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Máx. 40 Caracteres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 mb-5">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Dados de acesso
            </span>

            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Senha"
              value={password}
              onChange={(value) => {
                if (/^[A-Za-z0-9]*$/.test(value) && value.length <= 6) {
                  setPassword(value);
                }
              }}
              type="password"
            />

            <Input
              label="Repetir Senha"
              value={repeatPassword}
              onChange={(value) => {
                if (/^[A-Za-z0-9]*$/.test(value) && value.length <= 6) {
                  setRepeatPassword(value);
                }
              }}
              type="password"
            />
          </div>

          <div className="flex justify-end gap-3 mt-12">
            <button
              onClick={() => {
                setShowConfirmModal(true);
              }}
              type="button"
              className="
                h-12 px-10 rounded-md
                border border-[#0B2B25]
                bg-white text-slate-700
                font-semibold
                hover:bg-[#00606D40]
                transition
              "
            >
              Cancelar
            </button>

            <button
              disabled={!isCreateFormValid()}
              type="submit"
              className={`
                h-12 px-10 rounded-md
                font-semibold text-white
                ${
                  !isCreateFormValid()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0290A4] hover:bg-[#00606D] cursor-pointer"
                }
              `}
            >
              Cadastrar
            </button>
          </div>
        </form>

        {showConfirmModal &&
          ConfirmModal(
            "Deseja cancelar?",
            "Os dados inseridos não serão salvos",
            () => {
              (setMode("LISTING"), warningToast("Cadastro cancelado"));
            },
          )}
      </div>
    );
  }

  function userEditing() {
    return (
      <div className="ml-1 px-8 py-2">
        <div className="flex items-center text-xs text-slate-500 mb-2">
          <span>Usuários</span>

          <span className="mx-2">
            <img src={arrowRight} alt=">" className="w-2 h-2" />
          </span>

          <span>Editar Usuário</span>
        </div>

        <div className="flex flex-row items-center gap-2 mb-4">
          <button
            onClick={() => {
              setMode("LISTING");
            }}
          >
            <img
              src={returnIcon}
              alt="<"
              className="mt-1 cursor-pointer w-5 h-5"
            />
          </button>

          <h1 className="text-3xl font-semibold text-[#0B2B25]">
            Editar Usuário
          </h1>
        </div>

        <form
          onSubmit={handleUpdateUser}
          className="w-full bg-white rounded-md border border-slate-200 shadow-sm px-4 py-4"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Dados do Usuário
            </span>

            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <input
                type="text"
                placeholder="Insira o nome completo*"
                value={userEditInfo?.name}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                    setUserEditInfo((prev) => ({
                      ...prev,
                      name: value,
                    }));
                  }
                }}
                maxLength={30}
                className="w-full h-12 px-3 bg-[#F4F4F4] border-b-2 border-transparent
              rounded-sm outline-none text-slate-700 placeholder:text-slate-500
              focus:border-[#0290A4]"
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Máx. 30 Caracteres
              </p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Insira o Nº da matrícula"
                value={userEditInfo?.registration}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    setUserEditInfo((prev) => ({
                      ...prev,
                      registration: value,
                    }));
                  }
                }}
                maxLength={10}
                className="w-full h-12 px-3 bg-[#F4F4F4] border-b-2 border-transparent
              rounded-sm outline-none text-slate-700 placeholder:text-slate-500
              focus:border-[#0290A4]"
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Mín. 4 Números | * Máx. 10 Caracteres
              </p>
            </div>

            <div>
              <input
                type="email"
                placeholder="Insira o E-mail*"
                value={userEditInfo?.email}
                onChange={(e) =>
                  setUserEditInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                maxLength={40}
                className="w-full h-12 px-3 bg-[#F4F4F4] border-b-2 border-transparent
              rounded-sm outline-none text-slate-700 placeholder:text-slate-500
              focus:border-[#0290A4]"
              />

              <p className="text-[10px] text-slate-600 text-right mt-1">
                * Máx. 40 Caracteres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 mb-5">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Dados de acesso
            </span>

            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nova Senha"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z0-9]*$/.test(value) && value.length <= 6) {
                    setPassword(value);
                  }
                }}
                maxLength={6}
                className="w-full h-12 px-3 bg-[#F4F4F4] border-b-2 border-transparent
              rounded-sm outline-none text-slate-700 placeholder:text-slate-500
              focus:border-[#0290A4]"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <img
                  src={showPassword ? EyeSlashIcon : EyeIcon}
                  alt=""
                  className="h-6 w-6"
                />
              </button>
            </div>

            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repetir Nova Senha"
                value={repeatPassword}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z0-9]*$/.test(value) && value.length <= 6) {
                    setRepeatPassword(value);
                  }
                }}
                maxLength={6}
                className="w-full h-12 px-3 bg-[#F4F4F4] border-b-2 border-transparent
              rounded-sm outline-none text-slate-700 placeholder:text-slate-500
              focus:border-[#0290A4]"
              />

              <button
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <img
                  src={showRepeatPassword ? EyeSlashIcon : EyeIcon}
                  alt=""
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-12">
            <button
              onClick={() => {
                setShowConfirmModal(true);
              }}
              type="button"
              className="h-12 px-10 rounded-md border border-[#0B2B25]
            bg-white text-slate-700 font-semibold
            hover:bg-[#00606D40] transition"
            >
              Cancelar
            </button>

            <button
              disabled={!isEditFormValid()}
              type="submit"
              className={`h-12 px-10 rounded-md font-semibold text-white ${
                !isEditFormValid()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0290A4] hover:bg-[#00606D] cursor-pointer"
              }`}
            >
              Salvar alterações
            </button>
          </div>
        </form>

        {showConfirmModal &&
          ConfirmModal(
            "Deseja cancelar?",
            "As alterações realizadas não serão salvas",
            () => setMode("LISTING"),
          )}
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-[#F3F3F3]">
      <Sidebar />

      <div className="flex-1">
        <TopBar />

        {!loading &&
          (mode === "LISTING" || mode === "LISTING_SEARCH") &&
          userList()}
        {!loading && mode === "CREATING" && userCreation()}
        {!loading && mode === "EDITING" && userEditing()}
      </div>
    </div>
  );
}
