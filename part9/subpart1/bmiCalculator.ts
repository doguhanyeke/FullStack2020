
const bmiCalculator = (height: number, weight: number): String => {
  const bmi = (weight * 10000) / (height * height)
  if(bmi < 25) {
    return "normal"
  } else if (bmi < 29) {
    return "overweight"
  } else {
    return "obese"
  }
}

console.log(bmiCalculator(180, 74))