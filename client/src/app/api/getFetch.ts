export const api = "http://localhost:3000/";
export const getFetch = async (ruta: string) => {
  try {
    const res = await fetch(api + ruta, {
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw Error;
    console.log(json);
    return json;
  } catch (error) {
    return error;
  }
};
export const postFetch = async (ruta: string, data: object) => {
  try {
    const res = await fetch(api + ruta, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw { error: "fallo al enviar" };
    const json = await res.json();
    return json;
  } catch (error) {
    return { error };
  }
};
