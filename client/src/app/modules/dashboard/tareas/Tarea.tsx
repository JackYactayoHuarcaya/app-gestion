import { useParams } from "react-router-dom";
import Menu from "../../../components/Menu";
import { useRef, useState } from "react";
import CreateTarea from "./components/CreateTarea";
import { AnimatePresence } from "framer-motion";
import ListaTarea from "../../../components/Lista/ListaTarea";

const Tarea = () => {
  const { id } = useParams();
  const [viewNewTarea, setViewNewTarea] = useState(false);
  const tareRef = useRef<HTMLDivElement>(null);

  return (
    <Menu>
      <div>
        <button
          onClick={() => {
            setViewNewTarea(true);
          }}
          className="bg-slate-600 p-1 rounded text-slate-100"
        >
          Crear tarea
        </button>
      </div>
      <div>
        <ListaTarea id={id ?? ""} />
      </div>
      <AnimatePresence>
        {viewNewTarea && (
          <div
            ref={tareRef}
            onClick={(e) => {
              const el = e.target as HTMLDivElement;
              if (tareRef.current === el) {
                setViewNewTarea(false);
              }
            }}
            className="w-full h-full absolute flex justify-center
        top-0 left-0 bg-[rgba(200,200,200,0.5)] items-center"
          >
            <CreateTarea id={id ?? ""} setViewNewTarea={setViewNewTarea} />
          </div>
        )}
      </AnimatePresence>
    </Menu>
  );
};
export default Tarea;
