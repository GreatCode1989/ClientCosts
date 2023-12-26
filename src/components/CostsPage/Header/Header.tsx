import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Spinner } from "../../Spinner/Spinner";
import { ICostsHeaderProps } from "../../../types";
import { countTotalPrice } from "../../../utils/arrayUtils";
import { $totalPrice, createCost } from "../../../context";
import { useStore } from "effector-react";
import "./styles.css";
import { validationInputs } from "../../../utils/validation";
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/auth";
import { createCostFx } from "../../../api/costsClient";

export const Header = ({ costs }: ICostsHeaderProps) => {
  const [spinner, setSpinner] = useState(false);
  const textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const totalPrice = useStore($totalPrice);

  useEffect(() => {
    countTotalPrice(costs);
  }, [costs]);

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    const textInputValue = textRef.current.value;
    const priceInputValue = priceRef.current.value;
    const dateInputValue = dateRef.current.value;

    if (!validationInputs(textRef, priceRef, dateRef)) {
      setSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const cost = await createCostFx({
      url: "/cost",
      cost: {
        text: textInputValue,
        price: parseInt(priceInputValue),
        date: dateInputValue,
      },
      token: authData.access_token,
    });

    if (!cost) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    createCost(cost);
    handleAlertMessage({
      alertText: "Успешно создано",
      alertStatus: "success",
    });
  };

  return (
    <div className="costs-header">
      <form className="d-flex mb-3" onSubmit={formSubmit}>
        <div className="form-item">
          <span>Куда было потрачено:</span>
          <input ref={textRef} type="text" className="form-control mt-1" />
        </div>
        <div className="form-item">
          <span>Сколько было потрачено:</span>
          <input ref={priceRef} type="text" className="form-control mt-1" />
        </div>
        <div className="form-item">
          <span>Когда было потрачено:</span>
          <input ref={dateRef} type="date" className="form-control mt-1" />
        </div>
        <button className="btn btn-primary add-btn">
          {spinner ? <Spinner top={5} left={20} /> : "Добавить"}
        </button>
      </form>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        Итого:
        <span style={{ marginLeft: 5 }}>
          {isNaN(totalPrice) ? 0 : parseInt(String(totalPrice))}
        </span>
        грн.
      </div>
    </div>
  );
};
