import { Component } from '@angular/core';
import { NavigationBarComponent } from "../shared/layout/components/navigation-bar/navigation-bar.component";
import { FooterComponent } from "../shared/layout/components/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'bld-pages',
  standalone: true,
  imports: [NavigationBarComponent, FooterComponent, RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
