import { motion } from "framer-motion";
import { Value } from "../../../../hook/Value";
import { SetStateAction, useState } from "react";
import { postFetch } from "../../../../api/getFetch";
import { useNavigate } from "react-router-dom";

const CreateTarea = ({
  id,
  setViewNewTarea,
}: {
  id: string;
  setViewNewTarea: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const titulo = Value();
  const descripcion = Value();
  const date = Value();
  const [estado, setEstado] = useState("Pendiente");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await postFetch("create_tarea", {
        title: titulo.val,
        description: descripcion.val,
        status: estado,
        assignedTo: id,
        date: date.val,
      });
      console.log(res);
    } catch (error) {
      alert("Error al crear");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key={"nueva-tarea"}
      className="w-[18rem] h-[20rem]  shadow-md
      bg-slate-400 rounded p-1"
    >
      <p className=" text-center text-xl font-bold text-slate-700">
        Nueva Tarea
      </p>
      <div className="h-full flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
            setViewNewTarea(false);
            navigate(0);
          }}
          action=""
          className="flex flex-col h-[80%] w-[80%] gap-2 text-slate-700"
        >
          <input
            onChange={(e) => {
              titulo.setVal(e.target.value);
            }}
            value={titulo.val}
            type="text"
            name="title"
            placeholder="Título"
            className="rounded p-1 outline-none"
          />
          <textarea
            onChange={(e) => {
              descripcion.setVal(e.target.value);
            }}
            value={descripcion.val}
            name="description"
            id=""
            className="p-1 rounded resize-none
            outline-none"
            placeholder="Descripción"
          ></textarea>
          <select
            name=""
            id=""
            className="outline-none 
            p-1 rounded"
            onChange={(e) => {
              setEstado(e.target.value);
            }}
            value={estado}
          >
            <option value="">Pendiente</option>
            <option value="">En progreso</option>
            <option value="">Completa</option>
          </select>
          <input
            onChange={(e) => {
              date.setVal(e.target.value);
            }}
            value={date.val}
            type="date"
            name="date"
            className="rounded p-1 outline-none"
          />
          <span>
            <button className="bg-slate-700 text-slate-200 p-1 rounded">
              Enviar
            </button>
          </span>
        </form>
      </div>
    </motion.div>
  );
};
export default CreateTarea;
