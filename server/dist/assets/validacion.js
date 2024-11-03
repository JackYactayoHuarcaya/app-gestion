"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCorreo = void 0;
const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.validarCorreo = validarCorreo;
