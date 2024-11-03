import { useEffect, useState } from "react";
import { api, postFetch } from "../../api/getFetch";
import { useNavigate } from "react-router-dom";

type typeTareas = {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  date: string;
};

const ListaTarea = ({ id }: { id: string }) => {
  const [arrayTarea, setArrayTarea] = useState<typeTareas[]>([]);
  const [arrayBusqueda, setArrayBusqueda] = useState<typeTareas[]>([]);
  const [selectState, setSelectState] = useState("");
  const navigate = useNavigate();

  const handlerChange = (index: number, val: string) => {
    setArrayTarea((e) => {
      const updateArray = [...e];
      updateArray[index] = { ...updateArray[index], status: val };
      return updateArray;
    });
  };

  const getTareas = async () => {
    try {
      const tareas = await postFetch("lista_tarea", { id });
      setArrayTarea(tareas.tareas);
      setArrayBusqueda(tareas.tareas);
    } catch (error) {
      console.log(error);
    }
  };
  const date = (t: string): string => {
    const d = new Date(t);
    return d.toLocaleDateString();
  };

  useEffect(() => {
    getTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-1 mt-2">
      <div>
        <select
          name=""
          id=""
          value={selectState}
          className=" rounded outline-none
        bg-slate-700 text-slate-200"
          onChange={(e) => {
            setSelectState(e.target.value);
            if (e.target.value === "Todos") {
              setArrayTarea(arrayBusqueda);
            } else if (e.target.value === "En progreso") {
              const newArray = [...arrayBusqueda];
              const array = newArray.filter((e) => e.status === "En progreso");
              setArrayTarea(array);
            } else if (e.target.value === "Completa") {
              const newArray = [...arrayBusqueda];
              const array = newArray.filter((e) => e.status === "Completa");
              setArrayTarea(array);
            } else if (e.target.value === "Pendiente") {
              const newArray = [...arrayBusqueda];
              const array = newArray.filter((e) => e.status === "Pendiente");
              setArrayTarea(array);
            }
          }}
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
      {arrayTarea &&
        arrayTarea.map((e, i) => (
          <ul
            key={e._id}
            className="p-1 bg-slate-400 rounded shadow flex gap-1"
          >
            {localStorage.getItem("rol") == "admin" ? (
              <li>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(api + "delete_tarea", {
                        method: "DELETE",
                        headers: {
                          "Content-type": "application/json; charset=utf-8",
                        },
                        credentials: "include",
                        body: JSON.stringify({ id: e._id }),
                      });
                      if (!res.ok) throw { err: "error al eliminar" };
                      navigate(0);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="bg-red-400 cursor-default
                 p-1 rounded hover:bg-red-300"
                >
                  Eliminar
                </button>
              </li>
            ) : null}

            <ul>
              <li>{e.title}</li>
              <li>{e.description}</li>
              <li>
                <select
                  name=""
                  id=""
                  value={e.status}
                  onChange={(selec) => {
                    handlerChange(i, selec.target.value);
                    console.log(e._id);
                    postFetch("update_tarea", {
                      id: arrayTarea[i]._id,
                      status: selec.target.value,
                    });
                  }}
                  className={`outline-none text-slate-900
                p-1 rounded ${
                  e.status === "Pendiente"
                    ? "bg-gray-500"
                    : e.status === "Completa"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completa">Completa</option>
                </select>
              </li>
              <li>{date(e.date)}</li>
            </ul>
          </ul>
        ))}
    </div>
  );
};
export default ListaTarea;
