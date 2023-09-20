import { Component, OnInit } from '@angular/core';
import { PingService } from './services/ping.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private pingService: PingService) { }

    apiState: "loading" | true | false = "loading"

    ngOnInit(): void {
        this.pingService.ping().subscribe({
            next:  _ => this.apiState = true,
            error: err => {
                this.apiState = false; console.log(err);
            }
        })
    }
    
}
