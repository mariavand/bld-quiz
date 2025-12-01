import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { atLeastTwoVowels } from '../../../shared/validators/atLeastTwoVowels.validator';
import { credsEvaluation } from '../../../shared/validators/credsEvaluation.validator';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'bld-login',
  standalone: true,
  imports: [PasswordModule, CommonModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, InputTextModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  errorMsg: { [key: string]: string } = {
    required: 'This field is required!',
    atLeastTwoVowels: 'Username must contain at least two vowels (a, e, i, o,u)!',
    sumLess: 'The password must be less!',
    pattern: 'Username must contain only lowercase!',
    min: 'The value must be more than 100',
    max: 'The value must be less than 999',
    maxLength: 'Username must have maximum 15 characters!',
  };

  form = this.#fb.group({
      username: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-z].*$'), atLeastTwoVowels()]],
      password: ['', [Validators.required, Validators.min(100), Validators.max(999), Validators.pattern('^[0-9].*$')]],
    },
    {
        validators: credsEvaluation()
    }
  );

  f(k: string): FormControl {
    return this.form.get(k) as FormControl;
  }

  getErrorsKeys(formErrors: any){
    return Object.keys(formErrors);
  }

  onSubmit(){
    if(this.form.valid){
      const { username, password } = this.form.value;
      this.#authService.login(username!, +password!);
      this.#router.navigate(['/system']);
    }
  }
}
