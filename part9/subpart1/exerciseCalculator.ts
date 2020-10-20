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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));