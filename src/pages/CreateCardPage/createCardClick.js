import { toast } from "react-toastify";
import { validateCard } from "../../validation/cardValidation";
import { normalizeDataCard } from "./normalizeDataCard";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";

const createCardClick = async (inputsValue, setErrorsState, navigate) => {
  try {
    const joiResponse = validateCard(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    const request = normalizeDataCard(inputsValue);
    const { data } = await axios.post("/cards", request);

    toast("New card has been created! :)", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(ROUTES.MYCARD);
  } catch (err) {
    console.log("err", err);
    toast("Request failed... try again", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export { createCardClick };
