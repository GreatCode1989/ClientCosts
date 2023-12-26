// CostsPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../CostsPage/Header/Header";
import { Spinner } from "../Spinner/Spinner";
import { getAuthDataFromLS } from "../../utils/auth";
import { getCostFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context";
import { useStore } from "effector-react";
import { CostsList } from "./CostsList/CostsList";

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef(true);

  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false;
      handleGetCosts();
      console.log(store);
    }
  }, []);

  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();
  
    
    if (authData && authData.access_token) {
      const costs = await getCostFx({
        url: "/cost",
        token: authData.access_token,
      });
  
      setSpinner(false);
      setCosts(costs);
    } else {
      console.error("Missing access_token in authData");
      setSpinner(false);
     
    }
  };
  

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: 30 }}>Учет моих расходов</h2>
      {useMemo(() => <Header costs={store}/>, [store])}
      <div style={{ position: "relative" }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(() => <CostsList costs={store}/>, [store])}
        {(!spinner && !store.length) && <h2>Список расходов пуст</h2>}
      </div>
    </div>
  );
};
