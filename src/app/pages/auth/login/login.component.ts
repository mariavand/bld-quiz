import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { atLeastTwoVowels } from '../../../shared/validators/atLeastTwoVowels.validator';
import { credsEvaluation } from '../../../shared/validators/credsEvaluation.validator';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'bld-login',
  standalone: true,
  imports: [PasswordModule, CommonModule, ReactiveFormsModule, FormsModule, FloatLabelModule, ButtonModule, InputTextModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);

  form = this.#fb.group({
      username: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-z].*$'), atLeastTwoVowels()]],
      password: ['', [Validators.required, Validators.min(100), Validators.max(999), Validators.pattern('^[0-9].*$')]],
    },
    {
        validators: credsEvaluation()
    }
  );

  onSubmit(){
    if(this.form.valid){
      const { username, password } = this.form.value;
      this.#authService.login(username!, +password!);
    }
  }
}
