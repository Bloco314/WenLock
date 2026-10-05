type LogoProps = {
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "8xl";
  isOpen?: boolean;
  invertColor?: boolean;
};

const textSizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "4xl": "text-4xl",
  "8xl": "text-8xl",
};

export function Logo({
  textSize = "lg",
  isOpen = true,
  invertColor = false,
}: LogoProps) {
  return (
    <div className={`text-[#0290A4] ${textSizes[textSize]} font-bold`}>
      {isOpen ? "Wen" : "W"}
      <span className={invertColor ? "text-black" : "text-white"}>
        {isOpen ? "Lock" : "L"}
      </span>
      .
    </div>
  );
}
