import { jwtDecode } from "jwt-decode";

export const getPersonalData = () => {
  const token = sessionStorage.getItem("access_token")!;
  const data: IDataUser = jwtDecode(token);

  return data;
};
