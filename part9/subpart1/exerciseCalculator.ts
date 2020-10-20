interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const sumOfExercises = exerciseHours.reduce((sum, e) => {
    sum += e
    return sum
  }, 0)
  
  const result = {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(e => e>0).length,
    target: target,
    average: sumOfExercises / exerciseHours.length,
    success: (sumOfExercises / exerciseHours.length) > target ? true : false,
    rating: Math.ceil(sumOfExercises / exerciseHours.length),
    ratingDescription: 'not too bad but could be better',

  }
  return result;
}

const workingHours: Array<number> = [];
console.log(process.argv.length)
for(var i=0; i<process.argv.length - 3; i+=1){
  workingHours.push(Number(process.argv[i+3]));
}
const target: number = Number(process.argv[2]);

try{
  console.log(calculateExercises(workingHours, target));
} catch(e) {
  console.log(e)
}