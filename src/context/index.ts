import { createDomain } from "effector";
import { ICosts } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICosts[]>();
export const createCost = costs.createEvent<ICosts>();
export const updateCost = costs.createEvent<ICosts>();
export const removeCost = costs.createEvent<string | number>();
export const setTotalPrice = costs.createEvent<number>();

const handleRemoveCost = (costs: ICosts[], id: string | number) => 
{
  return costs.filter(cost => cost._id !== id);
}

const handleUpdateCost = (
  costs: ICosts[], 
  id: string | number, 
  payload: Partial<ICosts>
  ) => costs.map(cost => {
    if(cost._id === id) {
      return {
        ...cost,
        ...payload
      }
    }

    return cost
  })



export const $costs = costs.createStore<ICosts[]>([])
  .on(createCost, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(removeCost, (state, id) => handleRemoveCost(state, id))
  .on(updateCost, (state, cost) => handleUpdateCost(state, cost._id as string,
    {
      text: cost.text,
      price: cost.price,
      date: cost.date
    }
    ));


export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);
