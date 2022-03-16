import {Component, OnInit} from '@angular/core';
import {faUser, faCreditCard, faTv, faTasks, faCog, faChartPie} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public faUser: IconDefinition;
    public faCreditCard: IconDefinition;
    public faTv: IconDefinition;
    public faTasks: IconDefinition;
    public faCog: IconDefinition;
    public faChartPie: IconDefinition;
    public selector = 1;

    constructor() {
    }

    ngOnInit(): void {
        this.faUser = faUser;
        this.faCreditCard = faCreditCard;
        this.faTv = faTv;
        this.faTasks = faTasks;
        this.faCog = faCog;
        this.faChartPie = faChartPie;
    }

    setSection(n: number) {
        this.selector = n;
    }
}
