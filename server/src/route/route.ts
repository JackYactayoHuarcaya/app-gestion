import { Request, Response, Router, NextFunction } from "express";
import {
  createUser,
  getUsers,
  sessionAuthorization,
  sessionJWToken,
} from "../controller/user";
import {
  createTarea,
  deleteTarea,
  listarTarea,
  updateTarea,
} from "../controller/tarea";
const route = Router();

const verify = (user: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session.rol);
    if (req.session) {
      if (req.session.rol === user) {
        next();
      }
    } else {
      res.json({ ok: false });
    }
  };
};
// sessiones .......................................
route.post("/init_session", sessionJWToken);
route.post("/create_user", createUser);
route.get("/token", sessionAuthorization);
// usuarios ........................................
route.get("/lista_user", verify("admin"), getUsers);
// tareas ..........................................
route.post("/create_tarea", verify("admin"), createTarea);
route.post("/lista_tarea", listarTarea);
route.post("/update_tarea", updateTarea);
route.delete("/delete_tarea", verify("admin"), deleteTarea);

export default route;
