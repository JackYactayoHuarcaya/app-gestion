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
exports.getUsers = exports.createUser = exports.sessionAuthorization = exports.sessionJWToken = void 0;
const model_1 = __importDefault(require("../model/model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validacion_1 = require("../assets/validacion");
const JWT = "secretpayload123456789";
const sessionJWToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield model_1.default.modelUser.findOne({ name, password });
    if (user) {
        req.session.rol = user.rol;
        console.log("rol 1: " + req.session.rol);
        const token = jsonwebtoken_1.default.sign({ name: user.name, password: user._id }, JWT);
        res.json({ user: true, token, rol: req.session.rol, id: user._id });
    }
    else {
        res.json({ user: false, message: "usuario no existe" });
    }
});
exports.sessionJWToken = sessionJWToken;
const sessionAuthorization = (req, res) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        const jwtVerify = jsonwebtoken_1.default.verify(token, JWT);
        if (jwtVerify) {
            res.json({ user: true, rol: req.session.rol });
        }
        else {
            res.json({ user: false });
        }
    }
    else {
        res.json({ user: false });
    }
};
exports.sessionAuthorization = sessionAuthorization;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, rol } = req.body;
        if (name.length >= 4 && (0, validacion_1.validarCorreo)(email) && password.length >= 3) {
            const existUser = yield model_1.default.modelUser.find({
                $or: [{ email }, { name }],
            });
            if (existUser.length >= 1) {
                res.json({ user: false, message: "El usuario ya existe" });
            }
            else {
                const user = yield model_1.default.modelUser.create({
                    name,
                    email,
                    password,
                    rol: "user",
                });
                if (user) {
                    res.json({ user: true, message: "Usuario creado" });
                }
                else {
                    res.json({ user: false, message: "Error al crear el usuario" });
                }
            }
        }
        else {
            res.json({ message: "Agrega datos validos" });
        }
    }
    catch (error) {
        res.json({ error, message: "Error de servidor" });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.modelUser.find();
        res.json({ user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
