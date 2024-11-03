import { Link, useLocation, useNavigate } from "react-router-dom";
import { Value } from "../../hook/Value";
import { useEffect } from "react";
import { postFetch } from "../../api/getFetch";

const Login = ({ session }: { session: boolean }) => {
  // iniciar sessión o crear cuenta ......
  const usuario = Value();
  const correo = Value();
  const contrasenia = Value();

  // ruta - Link / estado titulo
  const location = useLocation();
  const routeLink = Value();
  useEffect(() => {
    location.pathname === "/iniciar_session"
      ? routeLink.setVal("/crear_cuenta")
      : routeLink.setVal("/iniciar_session");
  }, [location.pathname, routeLink]);

  // submit .....................................
  const navigate = useNavigate();
  const crearCuenta = async () => {
    const res = (await postFetch("create_user", {
      name: usuario.val,
      password: contrasenia.val,
      email: correo.val,
    })) as { user: boolean; message: string };

    alert(res.message);
  };
  const iniciarSession = async () => {
    const res = await postFetch("init_session", {
      name: usuario.val,
      password: contrasenia.val,
    });
    alert(res.message);
    if (res.user) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("rol", res.rol);
      localStorage.setItem("id", res.id);
      navigate("/");
    }
  };
  const submitData = () => {
    session ? iniciarSession() : crearCuenta();
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div
        className="w-[20rem] h-[20rem] border rounded-lg shadow shadow-slate-300
      flex justify-center items-center roundeds bg-slate-100"
      >
        <div className="w-[80%]">
          <p className="text-xl font-bold text-slate-700 text-center">
            {session ? "Iniciar Sesión" : "Crear cuenta"}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitData();
            }}
            className="text-slate-800 flex flex-col gap-3 mt-5"
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={usuario.val}
                className="border outline-none 
            bg-slate-200 p-1 rounded "
                placeholder="Usuario"
                onChange={(e) => {
                  const el = e.target;
                  usuario.setVal(el.value);
                }}
              />
              {!session && (
                <input
                  type="text"
                  value={correo.val}
                  className="border outline-none 
            bg-slate-200 p-1 rounded "
                  placeholder="Correo"
                  onChange={(e) => {
                    const el = e.target;
                    correo.setVal(el.value);
                  }}
                />
              )}
              <input
                type="text"
                value={contrasenia.val}
                className="border outline-none 
            bg-slate-200 p-1 rounded "
                placeholder="Contraseña"
                onChange={(e) => {
                  const el = e.target;
                  contrasenia.setVal(el.value);
                }}
              />
            </div>
            <div className="flex justify-between items-end">
              <button
                className="w-[4rem] p-1 text-center
           bg-slate-700 text-slate-100 rounded"
              >
                {session ? "Iniciar" : "Crear"}
              </button>
              <Link to={routeLink.val} className="text-blue-500">
                {session ? "crear cuenta" : "Iniciar sessión"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
