import { api } from "./getFetch";

export const getSession = async (token: string) => {
  try {
    const res = await fetch(api + "token", {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const json = (await res.json()) as {
      user: boolean;
      token: string;
      rol: string;
    };
    if (!res.ok) throw { error: await res.text() };
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const postFetch = async (ruta: string, data: object) => {
  try {
    const json = (await postFetch(ruta, data)) as {
      user: boolean;
      token?: string;
    };
    return json;
  } catch (error) {
    console.log(error);
  }
};
