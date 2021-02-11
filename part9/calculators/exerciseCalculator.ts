interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const giveRating = (average: number, target: number) : number => {
    if (average <= target * 0.5) {
        return 1;
    } else if (average < target) {
        return 2;
    } else if (average === target) {
        return 3;
    } else if (average >= target * 1.5) {
        return 4;
    } else {
        return 5;
    }
};
const getRatingDescription = (rating: number): string => {
    switch(rating) {
        case 1:
            return 'you\'re not doing well';
        case 2:
            return 'not too bad but could be better';
        case 3:
            return 'you\'ve hit your target';
        case 4:
            return 'you\'ve surpassed you\'re goal';
        case 5:
            return 'you are going far above you\'re intended target, congratulations!';
        default:
            throw new Error('getRatingDescription received improper argument!');
    }
};
const calculateExercise = (daily_exercises: Array<number>, target: number): Result => {
    const average: number = daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;
    const rating: number = giveRating(average, target);
    return {
        periodLength: daily_exercises.length,
        trainingDays: daily_exercises.filter(hours => hours !== 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: getRatingDescription(rating),
        target: target,
        average: average
    };
};

export default calculateExercise;

/*
if (process.argv.length !== 4) {
    throw Error('call calculateExercise with two parameters, list of daily hours exercised(list of numbers must not contain spaces) and target hours')
}
convert user inputed string into a list of numbers
const listInputToNumbers: Array<number> = process.argv[2].replace('[', '').replace(']', '').split(',').map(hour => parseInt(hour));
console.log(calculateExercise(listInputToNumbers, parseInt(process.argv[3])));
*/