"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuario = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    rol: String,
});
const tarea = new mongoose_1.default.Schema({
    title: String,
    description: String,
    status: String,
    assignedTo: String,
    date: Date,
});
const modelUser = (_a = mongoose_1.default.models["usuarios"]) !== null && _a !== void 0 ? _a : mongoose_1.default.model("usuarios", usuario);
const modelTarea = (_b = mongoose_1.default.models["tareas"]) !== null && _b !== void 0 ? _b : mongoose_1.default.model("tareas", tarea);
const model = {
    modelTarea,
    modelUser,
};
exports.default = model;
