import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-unavailable',
  templateUrl: './api-unavailable.component.html',
  styleUrls: ['./api-unavailable.component.css']
})
export class ApiUnavailableComponent {
    showRickRoll = false;

    roll() {
        this.showRickRoll = true;
    }
}
