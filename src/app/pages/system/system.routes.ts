import { Routes } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { ResultsComponent } from "./quiz/results/results.component";
import { SystemComponent } from "./system.component";

export const SYSTEM_ROUTES: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full'
      },
      {
        path: 'quiz',
        component: QuizComponent,
        title: 'Quiz Test',
      },
      {
        path: 'results/:points',
        component: ResultsComponent,
        title: 'Quiz Results'
      }
    ]
  },
]
