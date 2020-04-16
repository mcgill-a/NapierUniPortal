import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEnrollment } from 'app/shared/model/enrollment.model';
import { Principal } from 'app/core';
import { EnrollmentService } from './enrollment.service';

@Component({
    selector: 'jhi-enrollment',
    templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent implements OnInit, OnDestroy {
    enrollments: IEnrollment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enrollmentService: EnrollmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.enrollmentService.query().subscribe(
            (res: HttpResponse<IEnrollment[]>) => {
                this.enrollments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEnrollments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEnrollment) {
        return item.id;
    }

    registerChangeInEnrollments() {
        this.eventSubscriber = this.eventManager.subscribe('enrollmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
