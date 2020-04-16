import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProgram } from 'app/shared/model/program.model';
import { Principal } from 'app/core';
import { ProgramService } from './program.service';

@Component({
    selector: 'jhi-program',
    templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit, OnDestroy {
    programs: IProgram[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private programService: ProgramService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.programService.query().subscribe(
            (res: HttpResponse<IProgram[]>) => {
                this.programs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrograms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProgram) {
        return item.id;
    }

    registerChangeInPrograms() {
        this.eventSubscriber = this.eventManager.subscribe('programListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
