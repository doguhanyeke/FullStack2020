import express from 'express';
import patientService, { patients } from '../services/patientService';
import toPatient, { toEntry } from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
    console.log("GET /");
    res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try{
        console.log("POST /");
        const newPatient = toPatient(req.body);
        const newPatientEntry = patientService.addPatient(newPatient);
        res.json(newPatientEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
        
});

router.get("/:id", (req, res) => {
    try{
        console.log("GET /:id");
        const patientId = req.params.id;
        const allPatients = patientService.getPatients();
        const theuser = allPatients.find(patient => patient.id === patientId);
        if (theuser) {
            res.status(200).send(theuser);
            return;
        }
        res.status(404).end();
        return;
    } catch (e) {
        res.status(404).send(e);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        console.log("POST /:id/entries");
        console.log("hi", req.body);
        const entry = toEntry(req.body);
        console.log("hala", entry, "lannn");
        const patientId = req.params.id;
        const thepatient = patients.find(patient => patient.id === patientId);
        console.log("here", patientId, thepatient, entry);
        if (thepatient && entry) {
            console.log("hoba");
            patientService.addEntryToPatient(thepatient, entry);
            console.log("hoba2");
            res.status(200).json(entry);
            console.log("son hali", entry);
            return;
        }
        res.status(404).end();
    } catch(e) {
        res.status(404).send(e);
    }
});

export default router;