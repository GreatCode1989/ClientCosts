import { setCosts } from "../context";
import { setAlert } from "../context/alert";
import { setAuth, setUsername } from "../context/auth";
import { IAlert } from "../types";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setCosts([]);
};

export const getAuthDataFromLS = () => {
  try {
    const isData = JSON.parse(localStorage.getItem("auth") as string);

    if (!isData) {
      removeUser();
      return;
    }

    return isData;
  } catch (error) {
    removeUser()
  }
};

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: "", alertStatus: "" }), 3000);
};
