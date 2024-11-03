"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route/route"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./model/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// cambiar url
const whiteList = ["http://localhost:5173"];
// midleware ......
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin) {
            if (whiteList.includes(origin) === true) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        }
        else {
            callback(null, false);
        }
    },
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_SESSION || "secret-session",
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,
    },
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.use(route_1.default);
app.listen(port);
