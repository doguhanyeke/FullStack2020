import express from "express";
import bmiCalculator from './bmiCalculator';

const app = express();

app.get("/hello", (_request, response) => {
  response.send('Hello Full Stack!');
})

app.get("/bmi", (request, response) => {
  const q: any = request.query
  try{
    console.log(q)
    const weight: number = Number(q.weight)
    const height: number = Number(q.height)
    if(isNaN(weight) || isNaN(height)){
      response.send({
        error: "malformatted parameters"
      })  
    }
    response.send({
      weight, 
      height, 
      bmi: bmiCalculator(height, weight)}
    );
  } catch(e){
    response.send({
      error: "malformatted parameters"
    })
  }
  
})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
})