import { useState } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  type?: "text" | "password";
  eyeIcon?: string;
  eyeSlash?: string;
}

export function Input({
  label,
  value,
  onChange,
  error = false,
  type = "text",
  eyeIcon,
  eyeSlash,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const hasValue = value.length > 0;

  return (
    <div className="flex flex-col relative">
      {hasValue && (
        <span
          className={`absolute top-2 left-3 text-[10px] ${
            error ? "text-[#B00020]" : "text-[#0290A4]"
          }`}
        >
          {label}
        </span>
      )}

      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full rounded p-3 focus:outline-none
          ${
            hasValue
              ? "pt-6 pb-2 border-b-2 border-[#0290A4]"
              : "border border-slate-200"
          }
          ${error ? "border-b-2 border-[#B00020]" : ""}
        `}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-3 ${hasValue ? "top-7" : "top-4"}`}
        >
          <img
            src={showPassword ? eyeIcon : eyeSlash}
            alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
          />
        </button>
      )}

      {error && (
        <p className="text-[10px] text-[#B00020] mt-1">Campo Obrigatório</p>
      )}
    </div>
  );
}
