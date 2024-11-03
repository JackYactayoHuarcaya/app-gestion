import { useNavigate } from "react-router-dom";

const Menu = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  return (
    <div className="w-full m-auto relative">
      <div className="flex">
        <nav className="border w-[10%] min-w-[8rem] min-h-screen">
          <ul className="flex flex-col justify-between border h-full">
            <li>
              <p className="">Logo...</p>
              <p>
                {localStorage.getItem("rol") === "admin"
                  ? "Usuarios"
                  : "Tareas"}
              </p>
            </li>
            <li
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("rol");
                navigate("/");
              }}
              className="cursor-default hover:bg-slate-300"
            >
              Cerrar sessión
            </li>
          </ul>
        </nav>
        <div className="border w-full">
          <div className="border">App</div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Menu;
