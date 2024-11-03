import mongoose from "mongoose";

const usuario = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rol: String,
});

const tarea = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignedTo: String,
  date: Date,
});

const modelUser =
  mongoose.models["usuarios"] ?? mongoose.model("usuarios", usuario);
const modelTarea = mongoose.models["tareas"] ?? mongoose.model("tareas", tarea);

const model = {
  modelTarea,
  modelUser,
};
export default model;
