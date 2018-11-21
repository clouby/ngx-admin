import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HotbedRoutingModule, routedComponents } from './hotbeds-routing.module';
import { NbCalendarModule, NbCalendarKitModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';


@NgModule({
    imports: [
        ThemeModule,
        HotbedRoutingModule,
        NbCalendarModule,
        NbCalendarKitModule,
        NbDatepickerModule,
        NbDialogModule.forChild(),
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class HotbedsModule { }
