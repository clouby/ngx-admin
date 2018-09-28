import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { HotbedRoutingModule, routedComponents } from "./hotbeds-routing.module";
import { NbCalendarModule, NbCalendarKitModule } from "@nebular/theme";


@NgModule({
    imports: [
        ThemeModule,
        HotbedRoutingModule,
        NbCalendarModule,
        NbCalendarKitModule,
    ],
    declarations: [
        ...routedComponents
    ]
})
export class HotbedsModule { }