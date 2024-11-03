import { getFetch } from "./getFetch";
export type typeUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  rol: string;
};

export const getListaUser = async () => {
  const json = (await getFetch("lista_user")) as { user: typeUser[] };
  console.log(json);
  return json;
};
