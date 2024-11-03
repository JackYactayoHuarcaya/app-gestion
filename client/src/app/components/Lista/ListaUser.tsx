import { useEffect, useState } from "react";
import { getListaUser, typeUser } from "../../api/getListaUser";
import { Link } from "react-router-dom";

const ListaUser = () => {
  const [arrayUser, setArrayUser] = useState<typeUser[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getListaUser();
      setArrayUser(data.user);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-1 cursor-default">
      <ul className="grid grid-cols-12">
        <li className="col-span-3">Nombre</li>
        <li className="col-span-9">Correo</li>
      </ul>
      {arrayUser.length >= 1
        ? arrayUser.map((e, i) => (
            <Link
              to={`/dashboard/${e._id}`}
              key={i}
              className=" bg-slate-300 grid grid-cols-12"
            >
              <li className="col-span-3">{e.name}</li>
              <li className="col-span-9">{e.email}</li>
            </Link>
          ))
        : null}
    </div>
  );
};
export default ListaUser;
