import { toast } from "sonner";
import check from "../assets/check.svg";
import info from "../assets/info.svg";
import warning from "../assets/warning.svg";

export function successToast(message: string) {
  toast.success(message, {
    icon: <img src={check} alt="" className="w-5 h-5" />,
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    icon: <img src={info} alt="" className="w-5 h-5" />,
  });
}

export function warningToast(message: string) {
  toast.warning(message, {
    icon: <img src={warning} alt="" className="w-5 h-5" />,
  });
}
