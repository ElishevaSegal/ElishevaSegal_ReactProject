import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateCard } from "../../validation/cardValidation";
import axios from "axios";

const updateChangesClick = async (
  inputsValue,
  setErrorsState,
  navigate,
  _id
) => {
  try {
    const joiResponse = validateCard(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    const { data } = await axios.put("/cards/" + _id, {
      title: inputsValue.title,
      subtitle: inputsValue.subtitle,
      description: inputsValue.description,
      phone: inputsValue.phone,
      email: inputsValue.email,
      web: inputsValue.web,
      image: {
        url: inputsValue.url,
        alt: inputsValue.alt,
      },
      address: {
        state: inputsValue.state,
        country: inputsValue.country,
        city: inputsValue.city,
        street: inputsValue.street,
        houseNumber: inputsValue.houseNumber,
        zip: +inputsValue.zip,
      },
    });
    toast("Your card has been edit succssefully", {
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
    toast("request failed...Please try again later", {
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
export { updateChangesClick };
