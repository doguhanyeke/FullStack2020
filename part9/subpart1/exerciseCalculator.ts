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
  const sumOfExercises: number = exerciseHours.reduce((sum, e) => {
    sum += e;
    return sum;
  }, 0);
  if(exerciseHours.length === 0){
    throw new Error("exercise hours length is 0");
  }
  const average: number = sumOfExercises / exerciseHours.length;
  
  const result = {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(e => e>0).length,
    target: target,
    average: average,
    success: average > target ? true : false,
    rating: Math.ceil(average),
    ratingDescription: 'not too bad but could be better',

  };
  return result;
};

const parseArguments = () => {
  if(process.argv.length < 3){
    throw new Error("not enough arguments");
  }

  const workingHours: Array<number> = [];
  for(let i=0; i<process.argv.length - 3; i+=1){
    if(isNaN(Number(process.argv[i+3]))){
      throw new Error("argument not a number");
    }
    workingHours.push(Number(process.argv[i+3]));
  }
  if(isNaN(Number(process.argv[2]))){
    throw new Error("argument not a number");
  }
  const target = Number(process.argv[2]);
  return {workingHours, target};
};


try{
  const args = parseArguments();
  console.log(calculateExercises(args.workingHours, args.target));
} catch(e) {
  console.log(e);
}