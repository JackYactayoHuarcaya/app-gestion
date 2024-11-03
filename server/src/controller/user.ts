import { Request, Response } from "express";
import model from "../model/model";
import jsonWT from "jsonwebtoken";
import { validarCorreo } from "../assets/validacion";

const JWT = "secretpayload123456789";

export const sessionJWToken = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await model.modelUser.findOne({ name, password });
  if (user) {
    req.session.rol = user.rol;
    console.log("rol 1: " + req.session.rol);
    const token = jsonWT.sign({ name: user.name, password: user._id }, JWT);

    res.json({ user: true, token, rol: req.session.rol, id: user._id });
  } else {
    res.json({ user: false, message: "usuario no existe" });
  }
};
export const sessionAuthorization = (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const jwtVerify = jsonWT.verify(token, JWT);
    if (jwtVerify) {
      res.json({ user: true, rol: req.session.rol });
    } else {
      res.json({ user: false });
    }
  } else {
    res.json({ user: false });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, rol } = req.body;
    if (name.length >= 4 && validarCorreo(email) && password.length >= 3) {
      const existUser = await model.modelUser.find({
        $or: [{ email }, { name }],
      });
      if (existUser.length >= 1) {
        res.json({ user: false, message: "El usuario ya existe" });
      } else {
        const user = await model.modelUser.create({
          name,
          email,
          password,
          rol: "user",
        });
        if (user) {
          res.json({ user: true, message: "Usuario creado" });
        } else {
          res.json({ user: false, message: "Error al crear el usuario" });
        }
      }
    } else {
      res.json({ message: "Agrega datos validos" });
    }
  } catch (error) {
    res.json({ error, message: "Error de servidor" });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await model.modelUser.find();
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
};
