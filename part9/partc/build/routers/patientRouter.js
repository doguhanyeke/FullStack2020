"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importStar(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("GET /");
    res.send(patientService_1.default.getPatients());
});
router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
        console.log("POST /");
        const newPatient = utils_1.default(req.body);
        const newPatientEntry = patientService_1.default.addPatient(newPatient);
        res.json(newPatientEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
router.get("/:id", (req, res) => {
    try {
        console.log("GET /:id");
        const patientId = req.params.id;
        const allPatients = patientService_1.default.getPatients();
        const theuser = allPatients.find(patient => patient.id === patientId);
        if (theuser) {
            res.status(200).send(theuser);
            return;
        }
        res.status(404).end();
        return;
    }
    catch (e) {
        res.status(404).send(e);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        console.log("POST /:id/entries");
        console.log("hi", req.body);
        const entry = utils_1.toEntry(req.body);
        console.log("hala", entry, "lannn");
        const patientId = req.params.id;
        const thepatient = patientService_1.patients.find(patient => patient.id === patientId);
        console.log("here", patientId, thepatient, entry);
        if (thepatient && entry) {
            console.log("hoba");
            patientService_1.default.addEntryToPatient(thepatient, entry);
            console.log("hoba2");
            res.status(200).json(entry);
            console.log("son hali", entry);
            return;
        }
        res.status(404).end();
    }
    catch (e) {
        res.status(404).send(e);
    }
});
exports.default = router;
