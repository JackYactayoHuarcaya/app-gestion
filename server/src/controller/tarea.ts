import { Request, Response } from "express";
import model from "../model/model";

export const listarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const tareas = await model.modelTarea.find({ assignedTo: id });
    if (tareas) {
      res.json({ tareas });
    } else {
      res.json({ message: "Error al buscar" });
    }
  } catch (error) {
    res.json({ error, message: "Error al buscar" });
  }
};

export const createTarea = async (req: Request, res: Response) => {
  const { title, description, status, assignedTo, date } = req.body;
  try {
    const tarea = await model.modelTarea.create({
      title,
      description,
      status,
      assignedTo,
      date,
    });
    if (tarea) {
      res.json({ tarea });
    } else {
      res.json({ message: "Error al agregar" });
    }
  } catch (error) {
    res.json({ error, message: "Error al agregar" });
  }
};

export const updateTarea = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  try {
    const update = await model.modelTarea.updateOne({ _id: id }, { status });
    if (update) {
      res.json({ update });
    } else {
      res.json({ message: "Error al modificar" });
    }
  } catch (error) {
    res.json({ message: "Error al modificar", error });
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id);
  try {
    const del = await model.modelTarea.deleteOne({ _id: id });
    if (del) {
      res.json({ del });
    } else {
      res.json({ message: "Error al modificar" });
    }
  } catch (error) {
    res.json({ message: "Error al modificar", error });
  }
};
