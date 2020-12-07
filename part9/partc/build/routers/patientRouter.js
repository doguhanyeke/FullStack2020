"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("getttt");
    res.send(patientService_1.default.getPatients());
});
router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        console.log("hhhheeee");
        const patientId = req.params.id;
        const allPatients = patientService_1.default.getPatients();
        const theuser = allPatients.find(patient => patient.id === patientId);
        console.log("hereeeee");
        res.status(200).send(theuser);
    }
    catch (e) {
        res.status(404).send(e);
    }
});
exports.default = router;
