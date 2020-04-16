import { NgModule } from '@angular/core';

import { StudentsPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [StudentsPortalSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [StudentsPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class StudentsPortalSharedCommonModule {}
