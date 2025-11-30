import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function atLeastTwoVowels(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    type vowels = 'a' | 'e' | 'i' | 'o' | 'u';
    type vowelsRecord = Record<vowels, number>;

    //Initialize the record
    let existingVowelsStatus: vowelsRecord = {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    };

    //For each character, if it is a vowel count in the corresponding record
    [...control.value].map((character: string) => {
      if(Object.keys(existingVowelsStatus).includes(character)){
        existingVowelsStatus[character as vowels]++;
      }
    });

    //Count how many are true
    let countVowels = Object.values(existingVowelsStatus).reduce((count, isPresent) => {
      return  count + isPresent;
    }, 0);

    //If vowels are less than 2 then return error
    if(countVowels < 2){
      return {
        atLeastTwoVowels: 'Username must contain at least two vowels (a, e, i, o,u)'
      }
    }

    return null;

  }
}
