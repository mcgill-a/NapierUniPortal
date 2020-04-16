import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnrollment } from 'app/shared/model/enrollment.model';

@Component({
    selector: 'jhi-enrollment-detail',
    templateUrl: './enrollment-detail.component.html'
})
export class EnrollmentDetailComponent implements OnInit {
    enrollment: IEnrollment;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enrollment }) => {
            this.enrollment = enrollment;
        });
    }

    previousState() {
        window.history.back();
    }
}
