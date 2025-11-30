import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function credsEvaluation(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    let listOfNumbers: number[] = [];

    for (let i = 10; i <= 150; i += 10){
      listOfNumbers = [...listOfNumbers, i];
    }

    const sum = [...control.value.username].reduce((counter, char, index) => counter = counter + listOfNumbers[index], 0);

    if(sum <= control.value.password){
      return { sumLess: 'The password must be less!' }
    }

    return null;

  }
}
