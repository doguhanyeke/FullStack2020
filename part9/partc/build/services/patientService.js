"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import patientData from '../data/patients.json';
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
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
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        dateOfBirth: obj.dateOfBirth,
        name: obj.name,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    addPatient
};
