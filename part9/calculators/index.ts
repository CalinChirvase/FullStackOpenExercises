import express from 'express';
import calculateBmi from './bmiCalculator';
import bodyParser from 'body-parser';
import calculateExercise from './exerciseCalculator';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.json({
    height: height,
    weight: weight,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercise', (req, res) => {
  //check for missing parameters
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).send({
      error: "missing parameters"
    })
  }

  const daily_exercises: Array<number> = req.body.daily_exercises;
  const target: number = req.body.target;

  //check that parameters have the right type
  if (isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.filter(hour => isNaN(hour)).length !== 0) {
    res.status(400).send({
      error: "malformed parameters"
    })
  }

  const result = calculateExercise(daily_exercises, target);
  res.json({result});
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});