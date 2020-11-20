"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("./types");
const isDate = (obj) => {
    return Boolean(Date.parse(obj));
};
const parseDate = (obj) => {
    if (!obj || !isString(obj) || !isDate(obj)) {
        throw new Error("Date is not formed well'");
    }
    return obj;
};
const isGender = (obj) => {
    return Object.values(types_1.Gender).includes(obj);
};
const parseGender = (obj) => {
    if (!obj || !isGender(obj)) {
        throw new Error("Gender is not formed well!");
    }
    return obj;
};
const isString = (obj) => {
    return typeof obj === "string" || obj instanceof String;
};
const parseString = (obj) => {
    if (!obj || !isString(obj)) {
        throw new Error("Object is not String!");
    }
    return obj;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPatient = (object) => {
    return {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth)
    };
};
exports.default = toPatient;
