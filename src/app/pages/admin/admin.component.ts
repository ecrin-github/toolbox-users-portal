import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';


@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit{

    constructor() {
    }

    ngOnInit() {
        window.location.href = environment.hostname + 'admin';
    }
}
