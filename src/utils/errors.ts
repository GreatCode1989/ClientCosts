import { AxiosError } from "axios";
import { ICosts, IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, handleAlertMessage, removeUser } from "./auth";
import {
  createCostFx,
  deleteCostsFx,
  getCostFx,
  refreshTokenFx,
  updateCostFx,
} from "../api/costsClient";
import { createCost, setCosts, updateCost } from "../context";

export const handleAxiosError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;

  if (errorMessage) {
    if (errorMessage === "jwt expired") {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFx({
        url: "/auth/refresh",
        token: authData.refresh_token,
        username: authData.username,
      });

      if (payload !== null) {
        switch (payloadData.type) {
          case "get":
            const costs = await getCostFx({
              url: "/cost",
              token: authData.access_token,
            });

            setCosts(costs);
            break;
          case "create":
            const cost = await createCostFx({
              url: "/cost",
              token: authData.access_token,
              cost: { ...payloadData.createCost?.cost } as ICosts,
            });

            if (!cost) {
              return;
            }

            createCost(cost);
            handleAlertMessage({
              alertText: "Успешно создано",
              alertStatus: "success",
            });
            break;
          case "update":
            const updatedCost = await updateCostFx({
              url: "/cost",
              token: authData.access_token,
              cost: { ...payloadData.updateCost?.cost } as ICosts,
              id: payloadData.updateCost?.id as string
            });

            if (!updatedCost) {
              return;
            }

            updateCost(updatedCost);
            handleAlertMessage({
              alertText: "Успешно обновлено",
              alertStatus: "success",
            });
            break;
          case "delete":
            await deleteCostsFx({
              url: "/cost",
              token: authData.access_token,
              id: payloadData.deleteCost?.id as string,
            });

            break;
        }
      }
    } else {
      handleAlertMessage({ alertText: errorMessage, alertStatus: "warning" });
      removeUser();
    }
  } else {
    handleAlertMessage({ alertText: errorMessage, alertStatus: "warning" });
  }
};
