import { getFetch } from "./getFetch";

type typeTarea = {
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  date: Date;
};

export const getListaTarea = async () => {
  const json = (await getFetch("lista_user")) as typeTarea[];
  return json;
};
