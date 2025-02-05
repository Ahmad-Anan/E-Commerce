import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavMainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
