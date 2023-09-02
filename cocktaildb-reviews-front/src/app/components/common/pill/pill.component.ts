import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-pill',
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.css']
})
export class PillComponent {
    @Input() text: string = '';
    @Input() class: string = '';
    @Input() url: string | undefined = undefined;
}