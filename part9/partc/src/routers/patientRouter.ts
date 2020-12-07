import express from 'express';
import patientService from '../services/patientService';
import toPatient from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
    console.log("getttt");
    res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        const patientId = req.params.id;
        const allPatients = patientService.getPatients();
        const theuser = allPatients.find(patient => patient.id === patientId);
        res.status(200).send(theuser);
    } catch (e) {
        res.status(404).send(e);
    }
});

export default router;