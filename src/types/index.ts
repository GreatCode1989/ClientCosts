export interface IAlert {
  alertText: string;
  alertStatus: string;
}

export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}

export interface ICostsHeaderProps {
  costs: ICosts[];
}

export interface ICosts {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}

export interface ICostsItemProps {
  cost: ICosts;
  index: number;
}

export interface IBaseEffectArgs {
  url: string;
  token: string;
}

export interface IDeleteCost extends IBaseEffectArgs {
  id: string | number;
}

export interface ICreateCost extends IBaseEffectArgs {
  cost: ICosts;
}

export  interface IUpdateCost extends IBaseEffectArgs {
  cost: ICosts;
  id: string | number;
}

export interface IRefreshToken extends IBaseEffectArgs {
  username: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCost?: Partial<IBaseEffectArgs>;
  deleteCost?: Partial<IDeleteCost>;
  updateCost?: Partial<IUpdateCost>
}
