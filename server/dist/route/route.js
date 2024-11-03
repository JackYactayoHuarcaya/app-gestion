"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const tarea_1 = require("../controller/tarea");
const route = (0, express_1.Router)();
const verify = (user) => {
    return (req, res, next) => {
        console.log(req.session.rol);
        if (req.session) {
            if (req.session.rol === user) {
                next();
            }
        }
        else {
            res.json({ ok: false });
        }
    };
};
// sessiones .......................................
route.post("/init_session", user_1.sessionJWToken);
route.post("/create_user", user_1.createUser);
route.get("/token", user_1.sessionAuthorization);
// usuarios ........................................
route.get("/lista_user", verify("admin"), user_1.getUsers);
// tareas ..........................................
route.post("/create_tarea", verify("admin"), tarea_1.createTarea);
route.post("/lista_tarea", tarea_1.listarTarea);
route.post("/update_tarea", tarea_1.updateTarea);
route.delete("/delete_tarea", verify("admin"), tarea_1.deleteTarea);
exports.default = route;
