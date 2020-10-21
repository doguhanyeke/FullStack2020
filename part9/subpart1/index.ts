import express from "express";
import bmiCalculator from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get("/hello", (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get("/bmi", (request, response) => {
  const q = request.query;
  try{
    console.log(q);
    const weight = Number(q.weight);
    const height = Number(q.height);
    if(isNaN(weight) || isNaN(height)){
      response.send({
        error: "malformatted parameters"
      });
    }
    response.send({
      weight, 
      height, 
      bmi: bmiCalculator(height, weight)}
    );
  } catch(e){
    console.log(e);
  }
  
});

app.post("/exercises", (request, response) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: any = request.body;
    console.log(body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(!body.daily_exercises || !body.target){
      response.send({
        error: "parameters missing"
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const daily_exercises = body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(body.target);
    if(isNaN(target)){
      response.send({
        error: "malformatted parameters"
      });
    }
    response.send(calculateExercises(
      daily_exercises,
      target
    ));
  } catch(e) {
    console.log(e);
  }
  
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
});