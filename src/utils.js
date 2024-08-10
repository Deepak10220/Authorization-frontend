import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    pasition: "top-right",
  });
};
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
