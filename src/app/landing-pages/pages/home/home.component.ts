import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CoreService} from '@core/services/core.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private titleService: Title,
                private coreService: CoreService, private router: Router) {
        this.titleService.setTitle('Appneuron');
    }

    ngOnInit(): void {
        if (this.coreService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

}
