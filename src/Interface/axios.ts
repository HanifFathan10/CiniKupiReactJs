import { AxiosResponse } from "axios";

export type Callback = (
  status: boolean,
  response: AxiosResponse | Error | any,
) => void;
