import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
    return diagnoses;
};

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    addEntry
};