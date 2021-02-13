import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getPatient,
    getNonSensitiveEntries,
    addPatient
};