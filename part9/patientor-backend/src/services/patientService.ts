import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (): null => {
    return null;
};

export default {
    getNonSensitiveEntries,
    addEntry
};