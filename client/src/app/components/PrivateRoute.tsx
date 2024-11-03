import { useEffect, useState } from "react";
// import { getSession } from "../api/session";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../api/session";

const PrivateRoute = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const responseSession = async () => {
      const tk = localStorage.getItem("token");
      if (tk) {
        const res = await getSession(tk);
        if (res?.user) {
          setSession(true);
        } else {
          setSession(false);
        }
      } else {
        setSession(false);
      }
    };
    responseSession();
  }, []);

  if (session === null) {
    return <div>Cargando</div>;
  } else if (session === false) {
    return <Navigate to={"/iniciar_session"} />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
