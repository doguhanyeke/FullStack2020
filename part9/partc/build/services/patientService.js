"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const patients = patients_json_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (obj) => {
    const newPatient = {
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        dateOfBirth: obj.dateOfBirth,
        name: obj.name,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation
    };
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    addPatient
};
