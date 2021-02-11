type BMI = 'Under' | 'Normal (healthy weight)' | 'Over' | 'Obese';
const calculateBmi = (height: number, mass: number): BMI => {
    //convert height from cm to m when calculating bmi
    const bmi: number = mass / (height/100)**2;
    if (bmi < 18.5) {
        return 'Under';
    } else if (18.5 <= bmi && bmi <= 25) {
        return 'Normal (healthy weight)';
    } else if (25 < bmi && bmi <= 30) {
        return 'Over';
    } else if (bmi > 30) {
        return 'Obese';
    } else{
        throw Error('bmi is invalid in calculateBmi');
    }
};

export default calculateBmi;

/*
if (process.argv.length !== 4) {
    throw Error('call calculateBmi with two parameters, height in cm and mass in kg')
}

console.log(calculateBmi(parseInt(process.argv[2]), parseInt(process.argv[3])));
*/