import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent {
  @Input() items: string[] = [];
  input: string = '';
}
