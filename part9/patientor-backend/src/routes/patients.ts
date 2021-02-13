/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientsService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientsService.getPatient(req.params.id);
        res.json(patient);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;