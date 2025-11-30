import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
   },
]
