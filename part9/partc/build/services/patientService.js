"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patients = void 0;
// import patientData from '../data/patients.json';
const patients_1 = __importDefault(require("../data/patients"));
const utils_1 = require("../utils");
exports.patients = patients_1.default;
const getPatients = () => {
    return exports.patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (obj) => {
    const newPatient = {
        id: utils_1.generateUniqueID(),
        dateOfBirth: obj.dateOfBirth,
        name: obj.name,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation,
        entries: []
    };
    exports.patients.push(newPatient);
    return newPatient;
};
const addEntryToPatient = (obj, entry) => {
    obj.entries.push(entry);
    exports.patients = exports.patients.map(patient => patient.id === obj.id ? obj : patient);
    return obj;
};
exports.default = {
    getPatients,
    addPatient,
    addEntryToPatient
};
