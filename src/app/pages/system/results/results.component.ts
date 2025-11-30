import { Component, inject } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'bld-results',
  standalone: true,
  imports: [],
  providers: [DataService],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  #dataService = inject(DataService);

}
