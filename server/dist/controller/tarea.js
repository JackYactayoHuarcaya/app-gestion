"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTarea = exports.updateTarea = exports.createTarea = exports.listarTarea = void 0;
const model_1 = __importDefault(require("../model/model"));
const listarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const tareas = yield model_1.default.modelTarea.find({ assignedTo: id });
        if (tareas) {
            res.json({ tareas });
        }
        else {
            res.json({ message: "Error al buscar" });
        }
    }
    catch (error) {
        res.json({ error, message: "Error al buscar" });
    }
});
exports.listarTarea = listarTarea;
const createTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, assignedTo, date } = req.body;
    try {
        const tarea = yield model_1.default.modelTarea.create({
            title,
            description,
            status,
            assignedTo,
            date,
        });
        if (tarea) {
            res.json({ tarea });
        }
        else {
            res.json({ message: "Error al agregar" });
        }
    }
    catch (error) {
        res.json({ error, message: "Error al agregar" });
    }
});
exports.createTarea = createTarea;
const updateTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    try {
        const update = yield model_1.default.modelTarea.updateOne({ _id: id }, { status });
        if (update) {
            res.json({ update });
        }
        else {
            res.json({ message: "Error al modificar" });
        }
    }
    catch (error) {
        res.json({ message: "Error al modificar", error });
    }
});
exports.updateTarea = updateTarea;
const deleteTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    try {
        const del = yield model_1.default.modelTarea.deleteOne({ _id: id });
        if (del) {
            res.json({ del });
        }
        else {
            res.json({ message: "Error al modificar" });
        }
    }
    catch (error) {
        res.json({ message: "Error al modificar", error });
    }
});
exports.deleteTarea = deleteTarea;
